import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function checkPasswd(passwd, user) {
  if (!user.passwd) {
    return false;
  }
  return await bcrypt.compare(passwd, user.passwd);
}

function createJWT(user) {
  const tokenPayload = {
    name: user.name,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

export default { checkPasswd, createJWT };
