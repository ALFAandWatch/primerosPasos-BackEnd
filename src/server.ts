import express from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

// Middlewares
app.use(
   cors({
      origin: 'http://localhost:3001', // dominio del frontend
      credentials: true, // 👈 permite enviar cookies
   })
);
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', router);

export default app;
