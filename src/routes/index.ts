import { Router } from 'express';
import authRouter from './auth.router';
import empresasRouter from './empresas.router';
import movimientosRouter from './movimientos.router';
import { empleadosRouter } from './empleados.router';
import { horarioRouter } from './horarios.router';
import { stockRouter } from './stock.router';
import { mensajesRouter } from './mensajes.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/empresas', empresasRouter);
router.use('/movimientos', movimientosRouter);
router.use('/empleados', empleadosRouter);
router.use('/horarios', horarioRouter);
router.use('/stock', stockRouter);
router.use('/mensajes', mensajesRouter);

export default router;
