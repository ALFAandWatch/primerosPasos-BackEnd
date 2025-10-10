import { Router } from 'express';
import {
   traerEmpresaPorIdController,
   traerTodasLasEmpresasController,
} from '../controllers/empresas.controller';

const empresasRouter = Router();

empresasRouter.get('/traerTodasLasEmpresas', traerTodasLasEmpresasController);
empresasRouter.get('/traerEmpresaPorId/:id', traerEmpresaPorIdController);

export default empresasRouter;
