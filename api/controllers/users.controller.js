import { User } from '../models/user.model.js';

export function getAllUsers(req, res, next) {
  User.find({})
    .populate('tasks', {
      title: 1,
      isCompleted: 1,
    })
    .then((result) => res.send(result))
    .catch((err) => next(err));

  /* try {
    result = await User.find({});
    res.send(result);
  } catch (err) {
    next(err);
  } */
}

export function addUser(req, res, next) {
  const user = req.body;
  if (!user.name) {
    next(new Error());
  }
  const newUser = User.create(user);
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
}

export function getUserById(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid id'));
  }
  User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

export function updateUser(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid id'));
  }
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => next(err));
}

export function deleteUser(req, res, next) {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(202).json({ deletedId: req.params.id });
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((err) => next(err));
}
