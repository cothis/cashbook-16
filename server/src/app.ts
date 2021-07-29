import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import logger from 'morgan';
import { createConnection } from 'typeorm';
import { dbConnection } from './databases';
import githubLoginRouter from './routes/githublogin';
import userRouter from './routes/user';

const COOKIE_SECRET = (process.env.cookie_secret as string) || 'set_this';

declare module 'express-session' {
  interface SessionData {
    githubId: number;
    username: string;
    avatar_url: string;
  }
}

const NedbStore = require('nedb-session-store')(session);
const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};
const sessionConfig = {
  secret: COOKIE_SECRET,
  store: new NedbStore({
    filename: 'sessionStore.db',
  }),
  resave: true,
  saveUninitialized: true,
};
app.use(logger('dev'));
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, '../public')));

createConnection(dbConnection);

app.use('/api/githublogin', githubLoginRouter);
app.use('/api/user', userRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
