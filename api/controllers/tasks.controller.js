import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';

export async function getAllTasks(req, res, next) {
  try {
    const result = await Task.find({}).populate('responsible', {
      name: 1,
      email: 1,
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
}
export async function addTask(req, res, next) {
  const { title, isCompleted, userId } = req.body;
  if (!title || !userId) {
    next(new Error());
  }
  try {
    const user = await User.findById(userId);
    const task = {
      title,
      isCompleted: isCompleted ? isCompleted : false,
      responsible: user._id,
    };
    const savedTask = await Task.create(task);
    savedTask.algo();
    user.tasks = [...user.tasks, savedTask._id];
    res.json(savedTask);
    user.save();
  } catch (err) {
    next(err);
  }

  // newTask
  //   .save()
  //   .then((savedTask) => {
  //     user.tasks = [...user.tasks, savedTask._id];
  //     res.json(savedTask);
  //     return user;
  //   })
  //   .then((user) => user.save())
  //   .catch((err) => next(err));
}

export function getTaskById(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid id'));
  }
  Task.findById(req.params.id)
    .populate('responsible', {
      name: 1,
      email: 1,
    })
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

export function updateTask(req, res, next) {
  if (!req.params.id) {
    next(new Error('Invalid id'));
  }
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((err) => next(err));
}

export function deleteTask(req, res, next) {
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(202).json({ deletedId: req.params.id });
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((err) => next(err));
}
