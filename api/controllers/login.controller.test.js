import * as controller from './login.controller.js';
import auth from '../helpers/auth.helpers.js';
import { User } from '../models/user.model.js';

jest.mock('../models/user.model');
jest.mock('../helpers/auth.helpers');

/* jest.mock('./login.controller.js', () => {
  return {
    ...jest.requireActual('./login.controller.js'),
    checkPasswd: jest.fn().mockResolvedValue(true),
    createJWT: jest.fn().mockReturnValue('token'),
  };
});*/

describe('Given the Login controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();

    /* controller.(); */
  });

  describe('When a user try to log (logUser is triggered)', () => {
    describe('And user and passwd are valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue({
          name: 'Julian',
          passwd: '1234',
          _id: '619a79c756ce74cd9336ce4e',
        });
        auth.checkPasswd = jest.fn().mockResolvedValue(true);
        auth.createJWT = jest.fn().mockImplementation(() => 'token');
        req.body = {
          userName: 'Julian',
          passwd: 1234,
        };
      });
      test('Then user model exists and have a method "findOne"', () => {
        expect(User.findOne).toBeTruthy();
      });
      test('Then user should be logged', async () => {
        const result = await controller.logUser(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(result).toBeTruthy();
      });
    });

    describe('And user or passwd are not valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue([]);
        auth.checkPasswd = jest.fn().mockResolvedValue(false);
        req.body = {
          userName: 'Pepe',
          passwd: '',
        };
      });

      test('user should not be logged', async () => {
        await controller.logUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
      });
    });

    describe('And user is not valid (promise is rejected)', () => {
      beforeEach(() => {
        User.findOne.mockRejectedValue([]);
        auth.checkPasswd = jest.fn().mockResolvedValue(false);
        req.body = {
          userName: 'Pepe',
          passwd: '',
        };
      });
      test('User model exists and have a method "findOne"', () => {
        expect(User.findOne).toBeTruthy();
      });
      test('user should not be logged', async () => {
        await controller.logUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
      });
    });
  });
});
