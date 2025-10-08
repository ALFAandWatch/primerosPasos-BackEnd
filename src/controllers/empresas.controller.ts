import { Request, Response } from 'express';
import { traerTodasLasEmpresasService } from '../services/empresas.service';

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
