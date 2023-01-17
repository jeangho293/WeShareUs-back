import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { UserRepository } from '../infrastructure/user.repository';
import { User } from '../domain/user.entity';

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
    account,
    password,
    confirmPassword,
  }: {
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

    await this.userRepository.save(User.Of({ account, password, confirmPassword }));
  }
}
