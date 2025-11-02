import { Router } from 'express';
import {
   crearMovimientoController,
   deleteMovimientoController,
   mostrarMovimientosLLController,
   mostrarTodosLosMovimientosController,
} from '../controllers/movimientos.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyAdmin } from '../middlewares/verifyAdminMiddleware';

export const movimientosRouter = Router();

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
movimientosRouter.get(
   '/mostrarMovimientosLL',
   verifyToken,
   verifyAdmin,
   mostrarMovimientosLLController
);
movimientosRouter.delete(
   '/borrarMovimiento',
   verifyToken,
   verifyAdmin,
   deleteMovimientoController
);
