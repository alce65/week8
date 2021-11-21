import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  tasks: Array,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const User = mongoose.model('User', userSchema);
