import * as controller from './tasks.controller.js';

jest.mock('../models/task.model');

describe('Given getAllTasks', () => {
  describe('When is triggered', () => {
    test('Then call send', async () => {
      const req = {
        tasks: [],
      };
      const res = {
        send: jest.fn(),
      };

      await controller.getAllTasks(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});
