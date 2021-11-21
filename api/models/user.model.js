import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', // nombre del modelo
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const User = mongoose.model('User', userSchema);
