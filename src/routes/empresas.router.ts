import { Router } from 'express';
import { traerTodasLasEmpresasController } from '../controllers/empresas.controller';

const empresasRouter = Router();

empresasRouter.get('/traerTodasLasEmpresas', traerTodasLasEmpresasController);

export default empresasRouter;
