import { Router } from 'express';
import {
   crearMovimientoController,
   deleteMovimientoController,
   editarMovimientoController,
   mostrarMovimientosController,
   mostrarRegistrosAlUsuarioController,
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
   '/mostrarRegistrosAlUsuario',
   verifyToken,
   mostrarRegistrosAlUsuarioController
);
// RUTAS ADMIN
movimientosRouter.get(
   '/mostrarMovimientosLL',
   verifyToken,
   verifyAdmin,
   mostrarMovimientosController
);
movimientosRouter.patch(
   '/editarMovimiento/:id',
   verifyToken,
   verifyAdmin,
   editarMovimientoController
);
movimientosRouter.delete(
   '/borrarMovimiento/:id',
   verifyToken,
   verifyAdmin,
   deleteMovimientoController
);
