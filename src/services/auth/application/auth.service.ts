import { Service } from 'typedi';

@Service()
export class AuthService {
  async kakaoLogin({ code }: { code?: string | string[] }) {
    return 'temp';
  }
}
