import 'reflect-metadata';
import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import logger from 'morgan';
import router from './routes/router';
import { PaymentHistory } from './entity/paymentHistory.entity';
import { PaymentCategory } from './entity/paymentCategory.entity';
import { PaymentMethod } from './entity/paymentMethod.entity';
import HistoryService from './services/HistoryService';

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
app.use(express.static(path.join(__dirname, '../public')));

const createDefaults = async () => {
  const method = await PaymentMethod.findOne({ where: { name: '현대카드' } });
  if (!method) {
    await PaymentMethod.create({ name: '현대카드' }).save();
  }
  const category = await PaymentCategory.findOne({ where: { name: '식비' } });
  if (!category) {
    await PaymentCategory.create({ name: '식비', color: '#e0e0e0' }).save();
  }
};

// createConnection().then(async (connection) => {
//   await createDefaults();
//   const category = await PaymentCategory.findOne();
//   const method = await PaymentMethod.findOne();
//   if (!category) return;
//   if (!method) return;

//   const result = await HistoryService.createHistory({
//     amount: 0,
//     category,
//     content: 'hi',
//     githubId: 'cothis',
//     isIncome: false,
//     method,
//     payDate: new Date(),
//   });

//   console.log(result);
// });

app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
