import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Credencial } from '../entities/Credencial';
import { Movimiento } from '../entities/Movimiento';
import { Empleado } from '../entities/Empleado';
import { Horario } from '../entities/Horario';
import { Usuario } from '../entities/Usuario';
import { Stock } from '../entities/Stock';
import { Mensaje } from '../entities/Mensaje';

dotenv.config();

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST || 'localhost',
   port: parseInt(process.env.DB_PORT || '5432'),
   username: process.env.DB_USER || 'postgres',
   password: process.env.DB_PASSWORD || 'postgres',
   database: process.env.DB_NAME || 'mi_base',
   synchronize: true,
   dropSchema: false,
   logging: false,
   entities: [
      Usuario,
      Credencial,
      Movimiento,
      Stock,
      Empleado,
      Horario,
      Mensaje,
   ],
   migrations: [],
   subscribers: [],
});
