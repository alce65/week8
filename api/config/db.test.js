import dotenv from 'dotenv';
dotenv.config();

import { mongoConnect } from './db.js';
import mongoose from 'mongoose';
import { Task } from '../models/task.model.js';

describe('given a connection with MongoDB', () => {
  let initialEnv;
  beforeAll(() => {
    initialEnv = process.env.NODE_ENV;
  });
  afterEach(() => {});
  afterAll(() => {
    process.env.NODE_ENV = initialEnv;
    mongoose.disconnect();
  });

  describe('when the environment is testing', () => {
    // One single block for sequential execution
    test('then should exist our DB ', async () => {
      // Environment development
      process.env.NODE_ENV = 'dev';
      let connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections[0].name).toBe(process.env.DB_NAME);
      mongoose.disconnect();
      // Environment production
      process.env.NODE_ENV = 'prod';
      connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections[0].name).toBe(process.env.DB_NAME_PROD);
      mongoose.disconnect();
      // Environment testing
      process.env.NODE_ENV = 'test';
      process.env.DB_USER = 'admin';
      connect = await mongoConnect();
      expect(connect).toBeTruthy();
      expect(connect.connections).toBeTruthy();
      expect(Task.collection.modelName).toBe('Task');
      expect(connect.connections[0].name).toBe(process.env.DB_NAME_TEST);
    });
  });
});
