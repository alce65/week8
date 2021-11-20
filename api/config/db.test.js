import dotenv from 'dotenv';
dotenv.config();

import { mongoConnect } from './db.js';
import mongoose from 'mongoose';
import { Task } from '../models/task.model.js';

describe('given a connection with MongoDB', () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  test('then should exist our DB ', async () => {
    process.env.DB_USER = 'admin';
    const connect = await mongoConnect();
    expect(connect).toBeTruthy();
    expect(connect.connections).toBeTruthy();
    expect(Task.collection.modelName).toBe('Task');
  });
});
