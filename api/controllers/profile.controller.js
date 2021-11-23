import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export async function readProfile(req, res, next) {
  const authorization = req.get('authorization');
  let token = '';
  let decodeToken = null;

  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      decodeToken = jwt.verify(token, process.env.SECRET);

      console.log(decodeToken);
    }
  } catch (error) {
    res.status(401).json({
      error: 'token missing or invalid',
    });
    return;
  }

  if (!token || !decodeToken?.id) {
    res.status(401).json({
      error: 'token missing or invalid',
    });
  } else {
    const userData = await User.findById(decodeToken.id).populate('tasks', {
      title: 1,
      isCompleted: 1,
    });

    res.json({
      user: userData,
      token,
    });
  }
  return token;
}
