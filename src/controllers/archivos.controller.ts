import { Request, Response } from 'express';
import {
   descargarArchivoService,
   eliminarArchivoService,
   obtenerArchivosFiltrosService,
   subirImagenService,
} from '../services/archivos.service';

export const subirImagenController = async (req: Request, res: Response) => {
   try {
      if (!req.file) {
         res.status(400).json({ message: 'No se recibió ningún archivo' });
         return;
      }

      const { tipo, descripcion, remitenteId, destinatarioId } = req.body;

      if (!remitenteId || !destinatarioId) {
         return res.status(400).json({
            message: 'Faltan remitenteId o destinatarioId en la solicitud.',
         });
      }

      const archivo = await subirImagenService({
         nombre: req.file.filename,
         url: `/uploads/${req.file.filename}`,
         tipo,
         descripcion,
         remitenteId: Number(remitenteId),
         destinatarioId: Number(destinatarioId),
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

export const obtenerArchivosFiltrosController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const { tipo } = req.query;

      if (!id || isNaN(Number(id))) {
         res.status(400).json({ message: 'ID de usuario inválido' });
         return;
      }

      const archivos = await obtenerArchivosFiltrosService({
         usuarioId: Number(id),
         tipo: typeof tipo === 'string' ? tipo : undefined,
      });

      if (archivos.length === 0) {
         res.status(200).json({
            message: 'No hay archivos registrados',
            data: [], // array vacío
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

export const eliminarArchivoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      console.log('🧩 Controller recibido ID:', id);

      if (!id || isNaN(Number(id))) {
         return res
            .status(400)
            .json({ message: 'ID inválido o no proporcionado' });
      }

      const result = await eliminarArchivoService(Number(id));

      return res.status(200).json(result);
   } catch (error: any) {
      console.error('Error en eliminarArchivoController:', error.message);

      if (error.message === 'Archivo no encontrado') {
         return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({
         message: 'Error al eliminar el archivo',
         error: error.message,
      });
   }
};

export const descargarArchivoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      const { filePath, nombre } = await descargarArchivoService(Number(id));

      res.download(filePath, nombre, (err) => {
         if (err) {
            console.error('Error al enviar archivo:', err.message);
            res.status(500).json({ message: 'Error al descargar el archivo' });
         }
      });
      return;
   } catch (error: any) {
      console.error('Error en descargarArchivoController:', error.message);

      if (error.message === 'Archivo no encontrado') {
         return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Error interno del servidor' });
   }
};
