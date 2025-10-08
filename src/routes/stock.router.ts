import { Router } from 'express';
import {
   mostrarStockPorEmpresaIdController,
   registrarStockController,
} from '../controllers/stock.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

export const stockRouter = Router();

stockRouter.post('/registrarStock', verifyToken, registrarStockController);
stockRouter.get(
   '/mostrarStockDeEmpresa/:id',
   verifyToken,
   mostrarStockPorEmpresaIdController
);
