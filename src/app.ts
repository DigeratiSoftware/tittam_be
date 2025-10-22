import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error';
import { userRouter } from './routes/user.routes';
import { schemeRouter } from './routes/scheme.routes';
import { componentRouter } from './routes/component.routes';
import { zoneRouter } from './routes/zone.routes';
import { districtRouter } from './routes/district.routes';
import { townPanchayatRouter } from './routes/townPanchayat.routes';
import { wardRouter } from './routes/ward.routes';
import { fieldRouter } from './routes/field.routes';

dotenv.config();

export const createServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    rateLimit({ windowMs: 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false })
  );

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/schemes', schemeRouter);
  app.use('/api/v1/components', componentRouter);
  app.use('/api/v1/zones', zoneRouter);
  app.use('/api/v1/districts', districtRouter);
  app.use('/api/v1/town-panchayats', townPanchayatRouter);
  app.use('/api/v1/wards', wardRouter);
  app.use("/api/v1/fields", fieldRouter);


  app.use(errorHandler);
  return app;
};
