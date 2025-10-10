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
import { verifyAdmin } from '../middlewares/verifyAdminMiddleware';

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

// ============================
// RUTAS DE ADMIN
// ============================

mensajesRouter.get(
   '/allAdmin/:id',
   verifyToken,
   verifyAdmin,
   obtenerTodosLosMensajesController
);
mensajesRouter.get(
   '/recibidosAdmin/:id',
   verifyToken,
   verifyAdmin,
   obtenerMensajesRecibidosController
);
mensajesRouter.get(
   '/enviadosAdmin/:id',
   verifyToken,
   verifyAdmin,
   obtenerMensajesEnviadosController
);
mensajesRouter.get(
   '/obtenerPorIdAdmin/:id',
   verifyToken,
   verifyAdmin,
   obtenerMensajePorIdController
);
