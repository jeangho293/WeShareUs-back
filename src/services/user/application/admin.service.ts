import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { UserRepository } from '../infrastructure/user.repository';
import { signToken } from '../../../libs/jwt';

@Service()
export class AdminService {
  @Inject()
  private readonly userRepository!: UserRepository;

  /**
   *
   * @params aud - unique key
   * @params password -비밀번호
   */
  async login({ aud, password }: { aud: string; password: string }) {
    const admin = await this.userRepository.findOne({ aud });

    if (!admin) {
      throw badRequest('해당 admin 계정은 존재하지 않습니다.', {
        errorMessage: 'ID or password is wrong.',
      });
    }

    if (admin.password !== password) {
      throw badRequest('admin 게정의 비밀번호가 일치하지 않습니다.', {
        errorMessage: 'ID or password is wrong.',
      });
    }

    const token = signToken({ id: admin.id, role: admin.role });
    return { token };
  }
}
