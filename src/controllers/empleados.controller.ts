import { Request, Response } from 'express';
import {
   editarEmpleadoService,
   eliminarEmpleadoService,
   listarEmpleadosAdminService,
   mostrarEmpleadoPorIdService,
   mostrarEmpleadosPorEmpresaIdService,
   registrarEmpleadoService,
   restaurarEmpleadoService,
} from '../services/empleados.service';

export const registrarEmpleadoController = async (
   req: Request,
   res: Response
) => {
   try {
      const empleado = req.body;
      await registrarEmpleadoService(empleado);
      res.status(201).json({ message: 'Empleado registrado con éxito' });
   } catch (error) {
      res.status(500).json({ error: 'Error al registrar el empleado' });
   }
};

export const mostrarEmpleadosPorEmpresaIdController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empresaId = Number(id);
      const empleados = await mostrarEmpleadosPorEmpresaIdService(empresaId);
      res.status(200).json({
         data: empleados,
         message: 'Empleados encontrados con éxito',
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al mostrar los empleados' });
   }
};

export const mostrarEmpleadoPorIdController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empleadoId = Number(id);

      if (isNaN(empleadoId)) {
         res.status(400).json({ error: 'ID inválido' });
         return;
      }

      const empleado = await mostrarEmpleadoPorIdService(empleadoId);
      res.status(200).json({
         data: empleado,
         message: 'Empleado encontrado con éxito',
      });
   } catch (error: any) {
      console.log('Error al encontrar empleado:', error);
      if (error.message === 'Empleado no encontrado') {
         res.status(404).json({ error: 'Empleado no encontrado' });
         return;
      }
      res.status(500).json({ error: 'Error al mostrar el empleado' });
      return;
   }
};

export const editarEmpleadoController = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const empleadoId = Number(id);
      const data = req.body;
      const empleado = await editarEmpleadoService(data, empleadoId);
      res.status(200).json({
         data: empleado,
         message: 'Empleado editado con éxito',
      });
   } catch (error: any) {
      console.log('Error al editar empleado:', error);
      if ((error.message = 'Empleado no encontrado')) {
         res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.status(500).json({ error: 'Error al editar el empleado' });
   }
};

export const eliminarEmpleadoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empleadoId = Number(id);
      await eliminarEmpleadoService(empleadoId);
      res.status(200).json({ message: 'Empleado eliminado con éxito' });
   } catch (error: any) {
      console.log('Error al eliminar empleado:', error);
      if ((error.message = 'Empleado no encontrado')) {
         res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.status(500).json({ error: 'Error al eliminar el empleado' });
   }
};

// ==========================
//  RUTAS DE ADMIN
// ==========================

export const listarEmpleadosAdminController = async (
   req: Request,
   res: Response
) => {
   try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || '';

      const result = await listarEmpleadosAdminService(page, limit, search);

      return res.json(result);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al listar empleados' });
   }
};

export const restaurarEmpleadoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empleadoId = Number(id);
      await restaurarEmpleadoService(empleadoId);
      res.status(200).json({ message: 'Empleado restaurado con éxito' });
   } catch (error: any) {
      console.log('Error al restaurar empleado:', error);
      if ((error.message = 'Empleado no encontrado')) {
         res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.status(500).json({ error: 'Error al restaurar el empleado' });
   }
};
