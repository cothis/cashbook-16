import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { dbConnection } from './databases';
import AuthRouter from './auth/auth.router';
import jwt from 'jsonwebtoken';
const NedbStore = require('nedb-session-store')(session);
const app = express();

declare module 'express-session' {
  export interface SessionData {
    token: string;
    user: { [key: string]: any };
  }
}
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: 'sample',
    store: new NedbStore({
      filename: 'sessionStore.db',
    }),
    cookie: {
      maxAge: 1000000,
    },
  })
);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', AuthRouter);

app.get('/*', (req, res) => {
  if (req.session.token) {
    const token = req.session.token;
    const result = jwt.verify(token, 'testkey');
    console.log(result);
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

createConnection(dbConnection);

export default app;
