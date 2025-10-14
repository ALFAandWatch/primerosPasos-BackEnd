import { Request, Response } from 'express';
import {
   obtenerArchivosPorUsuarioIdService,
   subirImagenService,
} from '../services/archivos.service';

export const subirImagenController = async (req: Request, res: Response) => {
   try {
      if (!req.file) {
         res.status(400).json({ message: 'No se recibió ningún archivo' });
         return;
      }

      const { tipo, descripcion, usuarioId } = req.body;

      const archivo = await subirImagenService({
         nombre: req.file.filename,
         url: `/uploads/${req.file.filename}`,
         tipo,
         descripcion,
         usuarioId: Number(usuarioId),
      });

      res.status(201).json({
         message: 'Archivo subido correctamente',
         archivo,
      });
   } catch (error: any) {
      console.error('Error en subirArchivoController:', error);
      res.status(500).json({ message: 'Error al subir el archivo' });
   }
};

export const obtenerArchivosPorUsuarioIdController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
         res.status(400).json({ message: 'ID de usuario inválido' });
         return;
      }

      const archivos = await obtenerArchivosPorUsuarioIdService(Number(id));

      if (archivos.length === 0) {
         res.status(404).json({
            message: 'Este usuario no tiene archivos registrados',
         });
         return;
      }

      res.status(200).json({
         message: 'Archivos obtenidos correctamente',
         data: archivos,
      });
   } catch (error) {
      console.error('Error en obtenerArchivosPorUsuarioController:', error);
      res.status(500).json({ message: 'Error al obtener los archivos' });
   }
};
