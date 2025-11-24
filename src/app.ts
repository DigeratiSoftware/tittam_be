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
import  workRouter  from './routes/work.routes';
import fileRoutes from "./routes/file.routes";
import { config } from "./config";
import path from "path";


dotenv.config();

export const createServer = () => {
  const app = express();

  app.use(helmet());
   app.use(cors());
 // app.use(cors({
  // origin: [
  //   "https://preview-duplicate-of-react-typescript-app-kzmit8mlrj604rpt1w8f.vusercontent.net", // your v0 preview app"
  //   "https://*.vusercontent.net", // v0.dev preview domains
  //   "https://v0.dev",
  //   "https://*.ngrok-free.app",
  //   "http://localhost:3000"
  // ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));
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
  app.use("/api/v1/work", workRouter);

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.use("/api/v1/files", fileRoutes);


  app.use(errorHandler);
  return app;
};
