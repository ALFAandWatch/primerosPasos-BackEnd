import { Request, Response } from 'express';
import {
   enviarMensajeService,
   marcarComoLeidoService,
   obtenerMensajePorIdService,
   obtenerMensajesEnviadosService,
   obtenerMensajesRecibidosService,
   obtenerTodosLosMensajesService,
} from '../services/mensajes.service';
import { mensajeDTO } from '../DTOs/mensajeDTO';

export const enviarMensajeController = async (req: Request, res: Response) => {
   try {
      const mensajeData: mensajeDTO = req.body;

      if (!mensajeData.contenido || mensajeData.contenido.trim() === '') {
         res.status(400).json({ error: 'El contenido no puede estar vacío' });
         return;
      }

      const mensajeEnviado = await enviarMensajeService(mensajeData);
      res.status(201).json(mensajeEnviado);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
   }
};

export const obtenerTodosLosMensajesController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      const usuarioId: number | 'admin' =
         id.toLowerCase() === 'admin' ? 'admin' : Number(id);

      if (usuarioId !== 'admin' && isNaN(usuarioId)) {
         res.status(400).json({ error: 'ID de usuario inválido' });
         return;
      }

      const mensajes = await obtenerTodosLosMensajesService(usuarioId);
      res.status(200).json(mensajes);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener todos los mensajes' });
   }
};

export const obtenerMensajesRecibidosController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      const usuarioId: number | 'admin' =
         id.toLowerCase() === 'admin' ? 'admin' : Number(id);

      if (usuarioId !== 'admin' && isNaN(usuarioId)) {
         return res.status(400).json({ error: 'ID de usuario inválido' });
      }

      const mensajesRecibidos = await obtenerMensajesRecibidosService(
         usuarioId
      );
      res.status(200).json(mensajesRecibidos);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener mensajes recibidos' });
   }
};

export const obtenerMensajesEnviadosController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;

      const usuarioId: number | 'admin' =
         id.toLowerCase() === 'admin' ? 'admin' : Number(id);

      if (usuarioId !== 'admin' && isNaN(usuarioId)) {
         return res.status(400).json({ error: 'ID de usuario inválido' });
      }

      const mensajesEnviados = await obtenerMensajesEnviadosService(usuarioId);
      res.status(200).json(mensajesEnviados);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener mensajes enviados' });
   }
};

export const obtenerMensajePorIdController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const mensajeId = Number(id);

      if (isNaN(mensajeId)) {
         res.status(400).json({ error: 'ID de mensaje inválido' });
         return;
      }

      const mensaje = await obtenerMensajePorIdService(mensajeId);
      res.status(200).json(mensaje);
   } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message === 'Mensaje no encontrado') {
         res.status(404).json({ error: 'Mensaje no encontrado' });
         return;
      }
      res.status(500).json({ error: 'Error al obtener el mensaje' });
   }
};

export const marcarComoLeidoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const mensajeId = Number(id);

      if (isNaN(mensajeId)) {
         res.status(400).json({ error: 'ID de mensaje inválido' });
         return;
      }

      const marcado = await marcarComoLeidoService(mensajeId);
      res.status(200).json(marcado);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al maracar como leído' });
   }
};
