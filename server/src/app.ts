import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import { createConnection } from 'typeorm';
import { dbConnection } from './databases';
import githubLoginRouter from './routes/githublogin';

const NedbStore = require('nedb-session-store')(session);
const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};
const sessionConfig = {
  secret: 'sample',
  store: new NedbStore({
    filename: 'sessionStore.db',
  }),
};
app.use(logger('dev'));
app.use(cors(corsConfig));
app.use(session(sessionConfig));

app.use(express.static(path.join(__dirname, '../public')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

createConnection(dbConnection);

app.use('/api/githublogin', githubLoginRouter);
app.use(
  history({
    index: path.join(__dirname, '../public/index.html'),
  })
);

export default app;
