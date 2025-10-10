import { Router } from 'express';
import {
   editarEmpleadoController,
   eliminarEmpleadoController,
   listarEmpleadosAdminController,
   mostrarEmpleadoPorIdController,
   mostrarEmpleadosPorEmpresaIdController,
   registrarEmpleadoController,
   restaurarEmpleadoController,
} from '../controllers/empleados.controller';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { verifyAdmin } from '../middlewares/verifyAdminMiddleware';

export const empleadosRouter = Router();

empleadosRouter.post(
   '/registrarEmpleado',
   verifyToken,
   registrarEmpleadoController
);
empleadosRouter.get(
   '/mostrarEmpleadosPorEmpresaId/:id',
   verifyToken,
   mostrarEmpleadosPorEmpresaIdController
);
empleadosRouter.get(
   '/mostrarEmpleadoPorId/:id',
   verifyToken,
   mostrarEmpleadoPorIdController
);
empleadosRouter.put(
   '/editarEmpleado/:id',
   verifyToken,
   editarEmpleadoController
);
empleadosRouter.delete(
   '/eliminarEmpleado/:id',
   verifyToken,
   eliminarEmpleadoController
);

// ============================
// RUTAS DE ADMIN
// ============================

empleadosRouter.get(
   '/listaAdmin',
   verifyToken,
   verifyAdmin,
   listarEmpleadosAdminController
);

empleadosRouter.patch(
   '/restaurarEmpleado/:id',
   verifyToken,
   verifyAdmin,
   restaurarEmpleadoController
);
