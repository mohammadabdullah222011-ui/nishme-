import express from 'express';
import cors from 'cors';
import router from '../src/routes/index.js';

const app = express();
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://127.0.0.1:55070', 'http://127.0.0.1:59174', 'https://nashmi-market-nashmi-admin.vercel.app', 'https://nashmi-market-nashmi-store.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

export default app;
