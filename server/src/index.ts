import app from './app';
import { createConnection } from 'typeorm';

const PORT = 3000;
createConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`Express Server listening on port : ${PORT}`)
  );
});
