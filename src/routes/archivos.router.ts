import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { upload } from '../middlewares/upload';
import {
   obtenerArchivosPorUsuarioIdController,
   subirImagenController,
} from '../controllers/archivos.controller';

export const archivoRouter = Router();

archivoRouter.post(
   '/subirImagen',
   verifyToken,
   upload.single('archivo'),
   subirImagenController
);

archivoRouter.get(
   '/obtenerImagenPorEmpleadoId/:id',
   verifyToken,
   obtenerArchivosPorUsuarioIdController
);
