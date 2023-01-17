import { badRequest } from '@hapi/boom';
import { plainToInstance } from 'class-transformer';
import { User } from './user.entity';
import { hashPassword } from '../../../libs/hash';

jest.mock('../../../libs/hash');

describe('User Entity 테스트', () => {
  describe('Of() 메소드 테스트', () => {
    it('정상적으로 User 객체를 생성한다.', () => {
      jest.mocked(hashPassword).mockImplementation(() => 'hashedPassword');
      const user = User.Of({ account: 'account', password: '1234', confirmPassword: '1234' });

      expect(user).toEqual(
        plainToInstance(User, {
          account: 'account',
          password: 'hashedPassword',
        })
      );
    });

    it('password !== confirmPassword면 에러를 발생시킨다.', () => {
      expect(() =>
        User.Of({ account: 'account-test', password: '1234', confirmPassword: '비밀번호486' })
      ).toThrow(badRequest(`Reconfirmation password and password are different.`));
    });
  });
});
