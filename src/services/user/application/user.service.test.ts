import { plainToInstance } from 'class-transformer';
import { badRequest } from '@hapi/boom';
import { UserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { User } from '../domain/user.entity';

jest.mock('../infrastructure/user.repository');

beforeEach(() => {
  jest.clearAllMocks();
});
describe('UserService 테스트', () => {
  const userService = new UserService();
  const userRepository = jest.mocked(new UserRepository());

  Object.assign(userService, { userRepository });

  describe('registerUser() 메소드 테스트', () => {
    it('이미 존재하는 account면 에러를 발생시킨다.', async () => {
      userRepository.findOne.mockResolvedValue(
        plainToInstance(User, {
          id: 'user-uuid',
          account: 'test',
          password: '1234',
        })
      );

      expect.assertions(1);
      await expect(() =>
        userService.registerUser({ account: 'test', password: '1234', confirmPassword: '1234' })
      ).rejects.toThrowError(badRequest('test is already existed user.'));
    });

    it('정상적으로 User 객체를 생성한다.', async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(
        plainToInstance(User, {
          id: 'user-uuid',
          account: 'test',
          password: '1234',
        })
      );

      await userService.registerUser({
        account: 'test',
        password: '1234',
        confirmPassword: '1234',
      });

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save.mock.calls[0][0]).toHaveProperty('account', 'test');
      expect(userRepository.save.mock.calls[0][0]).toHaveProperty('password');
    });
  });
});
