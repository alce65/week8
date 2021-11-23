import * as controller from './profile.controller.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('jsonwebtoken');

describe('Given the Login controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {}, get: null };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  describe('when the user try to access to a profile (readProfile is triggered)', () => {
    describe('And the user have a token', () => {
      beforeEach(() => {
        req.get = jest.fn().mockReturnValue('Bearer Token');
      });

      test('Then user should be logged', async () => {
        const result = await controller.readProfile(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(result).toBeTruthy();
      });
    });

    describe('And the user do not have a token', () => {
      beforeEach(() => {
        req.get = jest.fn().mockReturnValue(null);
      });

      test('Then user should be logged', async () => {
        const result = await controller.readProfile(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(result).toBeFalsy();
      });
    });
  });
});
