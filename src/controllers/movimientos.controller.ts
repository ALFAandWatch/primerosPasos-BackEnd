import { Request, Response } from 'express';
import {
   crearMovimientoService,
   deleteMovimientoService,
   editarMovimientoService,
   mostrarMovimientosService,
   mostrarRegistrosAlUsuarioService,
   mostrarTodosLosMovimientosService,
} from '../services/movimientos.services';

export const crearMovimientoController = async (
   req: Request,
   res: Response
) => {
   try {
      const movimientos = req.body;
      if (!Array.isArray(movimientos)) {
         return res.status(400).json({ error: 'El cuerpo debe ser un array' });
      }
      const movimientosGuardados = await crearMovimientoService(movimientos);
      return res.status(201).json({
         message: 'Movimientos guardados correctamente',
         data: movimientosGuardados,
      });
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         error: 'Error al guardar los movimientos',
         details: error.message || error,
      });
   }
};

export const mostrarRegistrosAlUsuarioController = async (
   req: Request,
   res: Response
) => {
   try {
      const { usuarioId, tipo, formaPago } = req.query;

      const filters = {
         tipo: tipo as 'venta' | 'compra' | undefined,
         formaPago: formaPago as 'contado' | 'credito' | undefined,
      };

      const movimientos = await mostrarRegistrosAlUsuarioService(
         usuarioId ? Number(usuarioId) : undefined,
         filters
      );

      return res.status(200).json({
         message: 'Movimientos obtenidos correctamente',
         data: movimientos,
      });
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         error: 'Error al obtener los movimientos',
         details: error.message || error,
      });
   }
};

export const mostrarTodosLosMovimientosController = async (
   req: Request,
   res: Response
) => {
   try {
      const movimientos = await mostrarTodosLosMovimientosService();
      return res.status(200).json({
         message: 'Movimientos obtenidos correctamente',
         data: movimientos,
      });
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         error: 'Error al obtener los movimientos',
         details: error.message || error,
      });
   }
};

// ============================
// RUTAS DE ADMIN
// ============================

export const mostrarMovimientosController = async (
   req: Request,
   res: Response
) => {
   try {
      const { usuarioId, tipo, formaPago } = req.query;

      const filters = {
         tipo: tipo as 'venta' | 'compra' | undefined,
         formaPago: formaPago as 'contado' | 'credito' | undefined,
      };

      const movimientos = await mostrarMovimientosService(
         usuarioId ? Number(usuarioId) : undefined,
         filters
      );

      return res.status(200).json({
         message: 'Movimientos obtenidos correctamente',
         data: movimientos,
      });
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         error: 'Error al obtener los movimientos',
         details: error.message || error,
      });
   }
};

export const editarMovimientoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const data = req.body;

      // Validar ID
      if (!id || isNaN(Number(id))) {
         return res.status(400).json({
            ok: false,
            msg: 'ID inválido',
         });
      }

      const movimientoEditado = await editarMovimientoService(Number(id), data);

      return res.status(200).json({
         ok: true,
         msg: 'Movimiento editado correctamente',
         data: movimientoEditado,
      });
   } catch (error: any) {
      console.error('Error al editar movimiento:', error);

      return res.status(500).json({
         ok: false,
         msg: 'Error al editar movimiento',
         error: error.message || error,
      });
   }
};

export const deleteMovimientoController = (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const movimiento = deleteMovimientoService(Number(id));
      res.status(200).json({
         message: 'Movimiento eliminado correctamente',
         data: movimiento,
      });
      return;
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         error: 'Error al eliminar el movimiento',
         details: error.message || error,
      });
   }
};
