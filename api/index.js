import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { mongoConnect } from './config/db.js';
import tasksRouter from './routes/tasks.router.js';
import usersRouter from './routes/users.router.js';
import loginRouter from './routes/login.router.js';
import profileRouter from './routes/profile.router.js';

// Initial operations

const port = process.env.PORT;
let __dirname = '';

export const app = express();
mongoConnect();

// Middelwares

app.use(express.json());
app.use(morgan('dev'));

if (process.env.NODE_ENV !== 'test') {
  import('./dirname.js').then((module) => {
    app.use(express.static(path.join(module.dirName(), 'public')));
  });
}

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// Routing

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.use((err, req, res, next) => {
  console.log('Gestión e errores');
  res.status(406).json({ name: err.name, msg: err.message });
});

const server = app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
