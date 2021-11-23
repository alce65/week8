import auth from './auth.helpers.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

test('should ... checkPasswd ', async () => {
  const passwd = '';
  const user = { passwd: '1234' };
  await auth.checkPasswd(passwd, user);
  expect(bcrypt.compare).toHaveBeenCalled();
});

test('should ... checkPasswd ', async () => {
  const passwd = '';
  const user = { passwd: '' };
  const result = await auth.checkPasswd(passwd, user);
  expect(result).toBe(false);
});

test('should ... createJWT ', () => {
  const user = { name: '', id: '' };
  auth.createJWT(user);
  expect(jwt.sign).toHaveBeenCalled();
});
