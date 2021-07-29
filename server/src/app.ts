import 'reflect-metadata';
import 'dotenv-defaults/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import logger from 'morgan';
import { createConnection } from 'typeorm';
// import { dbConnection } from './databases';
import githubLoginRouter from './routes/githublogin';
import userRouter from './routes/user';
import { PaymentHistory } from './entity/paymentHistory.entity';
import { PaymentCategory } from './entity/paymentCategory.entity';
import { PaymentMethod } from './entity/paymentMethod.entity';

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

createConnection().then(async (connection) => {
  await createDefaults();
  const method = await PaymentMethod.findOneOrFail({
    where: { name: '현대카드' },
  });
  const category = await PaymentCategory.findOne({ where: { name: '식비' } });

  const paymentHistory = PaymentHistory.create({
    githubId: 'cothis',
    isIncome: false,
    category: category,
    method: method,
    amount: 3500,
    content: '국밥',
  });
  paymentHistory.save();
});

app.use('/api/githublogin', githubLoginRouter);
app.use('/api/user', userRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
