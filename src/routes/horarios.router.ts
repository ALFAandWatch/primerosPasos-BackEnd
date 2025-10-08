import { Router } from 'express';
import {
   obtenerHorarioDeHoyController,
   obtenerHorariosEmpleadoController,
   registrarHorarioController,
} from '../controllers/horarios.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

export const horarioRouter = Router();

horarioRouter.post(
   '/registrarHorario',
   verifyToken,
   registrarHorarioController
);
horarioRouter.get(
   '/obtenerHorarios',
   verifyToken,
   obtenerHorariosEmpleadoController
);
horarioRouter.get(
   '/obtenerHorarioDeHoy/:id',
   verifyToken,
   obtenerHorarioDeHoyController
);
