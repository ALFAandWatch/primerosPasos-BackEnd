import { Router } from 'express';
import {
   enviarMensajeController,
   marcarComoLeidoController,
   obtenerMensajePorIdController,
   obtenerMensajesEnviadosController,
   obtenerMensajesRecibidosController,
   obtenerTodosLosMensajesController,
} from '../controllers/mensajes.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

export const mensajesRouter = Router();

mensajesRouter.post('/enviarMensaje', verifyToken, enviarMensajeController);
mensajesRouter.get('/all/:id', verifyToken, obtenerTodosLosMensajesController);
mensajesRouter.get(
   '/recibidos/:id',
   verifyToken,
   obtenerMensajesRecibidosController
);
mensajesRouter.get(
   '/enviados/:id',
   verifyToken,
   obtenerMensajesEnviadosController
);
mensajesRouter.get(
   '/obtenerPorId/:id',
   verifyToken,
   obtenerMensajePorIdController
);
mensajesRouter.patch('/:id/leido', verifyToken, marcarComoLeidoController);
