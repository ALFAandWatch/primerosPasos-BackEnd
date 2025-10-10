import { Request, Response } from 'express';
import {
   traerEmpresaPorIdService,
   traerTodasLasEmpresasService,
} from '../services/empresas.service';

export const traerTodasLasEmpresasController = async (
   req: Request,
   res: Response
) => {
   try {
      const empresas = await traerTodasLasEmpresasService();
      res.status(200).json(empresas);
   } catch (error: any) {
      res.status(500).json({
         message: 'Error al traer empresas',
         error: error.message,
      });
   }
};

export const traerEmpresaPorIdController = async (
   req: Request,
   res: Response
) => {
   const { id } = req.params;
   try {
      const empresa = await traerEmpresaPorIdService(Number(id));
      if (!empresa) {
         return res.status(404).json({ message: 'Empresa no encontrada' });
      }
      res.status(200).json(empresa);
   } catch (error: any) {
      if (error.message === 'Empresa no encontrada') {
         res.status(404).json({ message: error.message });
         return;
      }
      res.status(500).json({
         message: 'Error al traer empresa',
         error: error.message,
      });
   }
};
