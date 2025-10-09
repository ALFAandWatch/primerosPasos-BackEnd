import { Router } from 'express';
import {
   mostrarStockLLController,
   mostrarStockPorEmpresaIdController,
   registrarStockController,
} from '../controllers/stock.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyAdmin } from '../middlewares/verifyAdminMiddleware';

export const stockRouter = Router();

stockRouter.post('/registrarStock', verifyToken, registrarStockController);
stockRouter.get(
   '/mostrarStockDeEmpresa/:id',
   verifyToken,
   mostrarStockPorEmpresaIdController
);
stockRouter.get(
   '/mostrarStockLL',
   verifyToken,
   verifyAdmin,
   mostrarStockLLController
);
