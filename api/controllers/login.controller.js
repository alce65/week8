import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../models/user.model.js';

export async function logUser(req, res, next) {
  // POST
  const { userName, passwd } = req.body;
  let user;
  try {
    user = await User.findOne({ name: userName });
  } catch (err) {
    next(err);
  }

  if (!user || !checkPasswd(passwd)) {
    res.status(401).json({ message: 'Invalid user or passwd' });
    return;
  }
  const jwToken = createJWT(user);
  res.json({
    user: user.name,
    token: jwToken,
  });
  return jwToken;
}

function checkPasswd(passwd) {
  return passwd ? true : false;
}

function createJWT(user) {
  const tokenPayload = {
    name: user.name,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}
