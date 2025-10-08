import { Router } from 'express';
import {
   crearMovimientoController,
   mostrarTodosLosMovimientosController,
} from '../controllers/movimientos.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

const movimientosRouter = Router();

movimientosRouter.post(
   '/crearMovimientos',
   verifyToken,
   crearMovimientoController
);
movimientosRouter.get(
   '/mostrarMovimientos',
   verifyToken,
   mostrarTodosLosMovimientosController
);

export default movimientosRouter;
