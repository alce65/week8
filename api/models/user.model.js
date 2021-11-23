import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwd: String,
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Task', // nombre del modelo,
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const User = mongoose.model('User', userSchema);
