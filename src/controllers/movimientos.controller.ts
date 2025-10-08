import { Request, Response } from 'express';
import {
   crearMovimientoService,
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
