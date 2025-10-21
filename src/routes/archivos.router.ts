import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { upload } from '../middlewares/upload';
import {
   descargarArchivoController,
   eliminarArchivoController,
   obtenerArchivosFiltrosController,
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
   '/obtenerImagenesFiltros/:id',
   verifyToken,
   obtenerArchivosFiltrosController
);

archivoRouter.delete('/eliminarArchivo/:id', eliminarArchivoController);

archivoRouter.get('/descargarArchivo/:id', descargarArchivoController);
