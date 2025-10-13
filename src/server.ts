import express from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';

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

// Rutas
app.use('/api', router);

export default app;
