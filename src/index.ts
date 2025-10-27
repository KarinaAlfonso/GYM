import { createApp } from './app';
import { AppDataSource } from './infrastructure/database/data_source';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4002;

AppDataSource.initialize()
  .then(async () => {
    const app = createApp();
    app.listen(port, () => {
      console.log(`Routine service listening on ${port}`);
    });
  })
  .catch(err => {
    console.error('DB initialization error', err);
  });
