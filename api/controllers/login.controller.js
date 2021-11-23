import auth from '../helpers/auth.helpers.js';
import { User } from '../models/user.model.js';

export async function logUser(req, res, next) {
  // POST
  const { userName, passwd } = req.body;
  let user;
  try {
    user = await User.findOne({ name: userName });
  } catch (err) {
    // next(err);
    // return;
    // si falla la promesa pasa al else final
  }
  if (user && (await auth.checkPasswd(passwd, user))) {
    const jwToken = auth.createJWT(user);
    res.json({
      user: user.name,
      token: jwToken,
    });
    return jwToken;
  } else {
    res.status(401).json({ message: 'Invalid user or passwd' });
    return;
  }
}
