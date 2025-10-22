import { createServer } from './app';
import { connectMongo } from './utils/db';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  const app = createServer();
  const PORT = Number(process.env.PORT || 4000);
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`🚀 User service listening on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error('Fatal start error', err);
  process.exit(1);
});
