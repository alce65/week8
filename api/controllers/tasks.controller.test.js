import * as controller from './tasks.controller.js';
import { Task } from '../models/task.model.js';

jest.mock('../models/task.model');

let req;
let res;
let next;
describe('Given the tasks controller', () => {
  beforeEach(() => {
    req = { params: {} }; //tasks: []
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn(),
    };
    next = jest.fn();
  });
  describe('When getAllTasks is triggered', () => {
    describe('And promise is resolved', () => {
      beforeEach(() => {
        Task.find.mockResolvedValue([]);
      });
      test('Then call send', async () => {
        await controller.getAllTasks(req, res, next);
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And promise is rejected', () => {
      beforeEach(() => {
        Task.find.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await controller.getAllTasks(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  addTask is triggered', () => {
    describe('And promise is resolved', () => {
      beforeEach(() => {
        Task.create.mockReturnValue({
          algo: jest.fn(),
          save: jest.fn(() => Promise.resolve()),
        });
      });
      describe('And Title is present', () => {
        beforeEach(() => {
          req.body = {
            title: 'Tarea adicional',
            responsible: 'Raul',
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
            responsible: 'Raul',
          };
        });
        test('Then call next', async () => {
          await controller.addTask(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
    });

    describe('And promise is rejected', () => {
      beforeEach(() => {
        req.body = {
          title: 'Tarea adicional',
          responsible: 'Raul',
        };
        Task.create.mockReturnValue({
          algo: jest.fn(),
          save: jest.fn(() => Promise.reject()),
        });
      });
      test('Then call next', async () => {
        await controller.addTask(req, res, next);
        expect(next).not.toHaveBeenCalled();
        // TODO: DEBERIA LLAMARSE
      });
    });
  });

  describe('When  getTaskById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findById.mockResolvedValue({});
      });
      test('Then call json', async () => {
        await controller.getTaskById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        Task.findById.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await controller.getTaskById(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        // TODO: DEBERIA LLAMARSE
      });
    });
  });

  describe('When  updateTask is triggered', () => {
    beforeEach(() => {
      req.params.id = '619516dd75bcdf9b77e6690c';
      req.body = {
        responsible: 'Juanita',
      };
    });
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        Task.findByIdAndUpdate.mockResolvedValue({});
      });
      test('Then call json', async () => {
        await controller.updateTask(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And the document is not updated (promise rejected)', () => {
      beforeEach(() => {
        Task.findByIdAndUpdate.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await controller.updateTask(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        // TODO: DEBERIA LLAMARSE
      });
    });
  });

  describe('When deleteTask is triggered', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findByIdAndDelete.mockResolvedValue({});
      });
      test('Then call status', async () => {
        await controller.deleteTask(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(202);
      });
    });

    describe('And id does not exist', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Task.findByIdAndDelete.mockResolvedValue();
      });
      test('Then call status', async () => {
        await controller.deleteTask(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });
});
