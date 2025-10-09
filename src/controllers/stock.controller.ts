import { Request, Response } from 'express';
import {
   mostrarStockLLService,
   mostrarStockPorEmpresaIdService,
   registrarStockService,
} from '../services/stock.service';

export const registrarStockController = async (req: Request, res: Response) => {
   try {
      const stockData = req.body;
      if (!Array.isArray(stockData)) {
         res.status(400).json({ error: 'El cuerpo debe ser un array' });
         return;
      }
      const stockGuardado = await registrarStockService(stockData);
      res.status(201).json({
         message: 'Stock guardados correctamente',
         data: stockGuardado,
      });
      return;
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         error: 'Error al guardar los movimientos',
         details: error.message || error,
      });
      return;
   }
};

export const mostrarStockPorEmpresaIdController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empresaId = Number(id);
      const stock = await mostrarStockPorEmpresaIdService(empresaId);
      res.status(200).json(stock);
      return;
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener el stock' });
   }
};

// ============================
// RUTAS DE ADMIN
// ============================

export const mostrarStockLLController = async (req: Request, res: Response) => {
   try {
      const offset = Number(req.query.offset) || 0;
      const limit = Number(req.query.limit) || 20;
      const usuarioId = req.query.usuarioId
         ? Number(req.query.usuarioId)
         : undefined;

      const { items, total } = await mostrarStockLLService(
         Number(offset),
         Number(limit),
         Number(usuarioId)
      );
      res.status(200).json({ items, total });
      return;
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener el stock' });
   }
};
