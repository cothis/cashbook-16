import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { dbConnection } from './databases';
const NedbStore = require('nedb-session-store')(session);
const app = express();

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
  })
);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

createConnection(dbConnection);

export default app;
