import mongoose from 'mongoose';
import * as controller from './tasks.controller.js';
import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';

jest.mock('../models/task.model');
jest.mock('../models/user.model');

describe('Given the tasks controller', () => {
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
  describe('When getAllTasks is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        Task.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call send', async () => {
        await controller.getAllTasks(req, res, next);
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And it does not work (promise is rejected)', () => {
      beforeEach(() => {
        Task.find.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error()),
        });
      });
      test('Then call next', async () => {
        await controller.getAllTasks(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  addTask is triggered', () => {
    describe('And task is trying to add (promise is resolved)', () => {
      beforeEach(() => {
        Task.create.mockResolvedValue({
          algo: jest.fn(),
        });
        User.findById.mockResolvedValue({
          _id: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
          tasks: [],
        });
      });
      describe('And Title is present', () => {
        beforeEach(() => {
          req.body = {
            title: 'Tarea adicional',
            responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
          };
        });
        test('Then call json', async () => {
          await controller.addTask(req, res, next);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And Title is not present', () => {
        beforeEach(() => {
          req.body = {
            responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
            isCompleted: true,
          };
        });
        test('Then call next', async () => {
          await controller.addTask(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
    });
    describe('And task could not be added (promise is rejected)', () => {
      beforeEach(() => {
        req.body = {};
        Task.create.mockRejectedValue({
          algo: jest.fn(),
        });
      });
      test('Then call next', async () => {
        await controller.addTask(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  getTaskById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await controller.getTaskById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        Task.findById.mockReturnValue({
          populate: jest.fn().mockRejectedValue([]),
        });
      });
      test('Then call next', async () => {
        await controller.getTaskById(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  updateTask is triggered', () => {
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        req.body = {
          responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
        };
        Task.findByIdAndUpdate.mockResolvedValue({});
      });
      test('Then call json', async () => {
        await controller.updateTask(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And the document is not updated (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        req.body = {};
        Task.findByIdAndUpdate.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await controller.updateTask(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteTask is triggered', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findByIdAndDelete.mockResolvedValue({});
        // if the document is deleted, an object is returned
      });
      test('Then call status & json', async () => {
        await controller.deleteTask(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And id does not exist', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findByIdAndDelete.mockResolvedValue();
        // if the document is deleted, no value is returned
      });
      test('Then call status & json', async () => {
        await controller.deleteTask(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And deletion its not possible (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        Task.findByIdAndDelete.mockRejectedValue();
      });
      test('Then call next', async () => {
        await controller.deleteTask(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        // expect(next).toHaveBeenCalled();
      });
    });
  });
});
