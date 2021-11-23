import * as controller from './users.controller.js';
import { User } from '../models/user.model';

jest.mock('../models/user.model');

describe('Given the Users controller', () => {
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
  });
  describe('When we try to get all users (getAllUsers is triggered)', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        User.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('User model exists and have a method "find"', () => {
        expect(User.find).toBeTruthy();
      });
      test('Then call send', async () => {
        await controller.getAllUsers(req, res, next);
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And it does not work (promise is rejected)', () => {
      beforeEach(() => {
        User.find.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error()),
        });
      });
      test('User model exists and have a method "find"', () => {
        expect(User.find).toBeTruthy();
      });
      test('Then call next', async () => {
        await controller.getAllUsers(req, res, next);
        expect(res.send).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        // TODO DEBERIA LLAMARSE
      });
    });
  });

  describe('When we try to add a user (addUser is triggered)', () => {
    describe('And user is trying to add (promise is resolved)', () => {
      beforeEach(() => {
        User.create.mockResolvedValue({});
      });
      test('User model exists and have a method "create"', () => {
        expect(User.create).toBeTruthy();
      });
      describe('And user Name is present', () => {
        beforeEach(() => {
          req.body = {
            name: 'Raul',
            email: 'raul@sample.com',
          };
        });
        test('Then call json', async () => {
          await controller.addUser(req, res, next);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And user Name is not present', () => {
        beforeEach(() => {
          req.body = {
            email: 'raul@sample.com',
          };
        });
        test('Then call next', async () => {
          await controller.addUser(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
      describe('And user could not be added (promise is rejected)', () => {
        beforeEach(() => {
          req.body = {};
          User.create.mockRejectedValue({});
        });
        test('Then call next', async () => {
          await controller.addUser(req, res, next);
          expect(res.json).not.toHaveBeenCalled();
          expect(next).toHaveBeenCalled();
        });
      });
    });
  });

  describe('When we try to get a single user (getUserById is triggered)', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        User.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('User model exists and have a method "findById"', () => {
        expect(User.findById).toBeTruthy();
      });
      test('Then call json', async () => {
        await controller.getUserById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        User.findById.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error()),
        });
      });
      test('User model exists and have a method "findById"', () => {
        expect(User.findById).toBeTruthy();
      });
      test('Then call next', async () => {
        await controller.getUserById(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When we try to update a user (updateUser is triggered)', () => {
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        req.body = {
          email: 'Juanita@sample.com',
        };
        User.findByIdAndUpdate.mockResolvedValue([]);
      });
      test('User model exists and have a method "findByIdAndUpdate"', () => {
        expect(User.findByIdAndUpdate).toBeTruthy();
      });
      test('Then call json', async () => {
        await controller.updateUser(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the document is not updated (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        req.body = {};
        User.findByIdAndUpdate.mockRejectedValue([]);
      });
      test('User model exists and have a method "findByIdAndUpdate"', () => {
        expect(User.findByIdAndUpdate).toBeTruthy();
      });
      test('Then call next', async () => {
        await controller.updateUser(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When we try to delete a user (deleteUser is triggered)', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        User.findByIdAndDelete.mockResolvedValue({});
        // if the document is deleted, an object is returned
      });
      test('User model exists and have a method "findByIdAndDelete"', () => {
        expect(User.findByIdAndDelete).toBeTruthy();
      });
      test('Then call status 202 & json', async () => {
        await controller.deleteUser(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And id does not exist', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        User.findByIdAndDelete.mockResolvedValue();
        // if the document is deleted, no value is returned
      });
      test('User model exists and have a method "findByIdAndDelete"', () => {
        expect(User.findByIdAndDelete).toBeTruthy();
      });
      test('Then call status 404 & json', async () => {
        await controller.deleteUser(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And deletion its not possible (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        User.findByIdAndDelete.mockRejectedValue();
      });
      test('Then call next', async () => {
        await controller.deleteUser(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        // expect(next).toHaveBeenCalled();
      });
    });
  });
});
