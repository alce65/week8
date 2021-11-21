import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // nombre del modelo
  },
  isCompleted: Boolean,
});
taskSchema.methods.algo = function () {};

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Task = mongoose.model('Task', taskSchema);
