import 'reflect-metadata';
import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import logger from 'morgan';
import router from './routes/router';
import errorController from './errors/ErrorController';

const COOKIE_SECRET = (process.env.cookie_secret as string) || 'set_this';

declare module 'express-session' {
  interface SessionData {
    githubId: string;
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);
app.use(errorController.handlerError);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
