import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { UserRepository } from '../infrastructure/user.repository';
import { RoleType, User } from '../domain/user.entity';

@Service()
export class UserService {
  @Inject()
  private readonly userRepository!: UserRepository;

  /**
   *
   * @param account - 회원 계정
   * @param password - 비밀번호
   * @param confirmPassword - 재확인 비밀번호
   * @description 회원가입 API
   */
  async registerUser({
    role,
    account,
    password,
    confirmPassword,
  }: {
    role: RoleType;
    account: string;
    password: string;
    confirmPassword: string;
  }) {
    const user = await this.userRepository.findOne({ account });

    if (user) {
      throw badRequest(`${account} is already existed user.`, {
        errorMessage: `${account} is already existed user.`,
      });
    }

    await this.userRepository.save(User.Of({ role, account, password, confirmPassword }));
  }

  /**
   *
   * @param account - 회원 계정
   * @param password - 비밀번호
   * @return token - 인증 토큰
   * @description 로그인 api
   */
  async login({ account, password }: { account: string; password: string }) {
    const user = await this.userRepository.findOne({ account });

    if (!user) {
      throw badRequest(`${account} is not existed user.`, {
        errorMessage: '계정 또는 비밀번호가 틀렸습니다.',
      });
    }

    if (!user.isCorrectPassword(password)) {
      throw badRequest(`${account}'s password is not correct.`, {
        errorMessage: '계정 또는 비밀번호가 틀렸습니다.',
      });
    }

    return { token: user.signAccessToken(), account: user.account };
  }
}
