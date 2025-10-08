import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import app from './server';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
   .then(() => {
      console.log('📦 Conectado a la base de datos');
      app.listen(PORT, () => {
         console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      });
   })
   .catch((error) => {
      console.error('❌ Error al conectar a la base de datos:', error);
   });
