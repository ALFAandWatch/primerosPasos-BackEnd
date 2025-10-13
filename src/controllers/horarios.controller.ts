import { Request, Response } from 'express';
import {
   obtenerHorarioDeHoyService,
   obtenerHorariosEmpleadoService,
   registrarHorarioService,
} from '../services/horarios.service';
import { ParsedQs } from 'qs';

export const registrarHorarioController = async (
   req: Request,
   res: Response
) => {
   try {
      const data = req.body;
      const respuesta = await registrarHorarioService(data);
      res.status(201).json(respuesta);
   } catch (error: any) {
      console.error('Error en registrarHorarioController:', error);
      if (error.message === 'Empleado no encontrado') {
         res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error al registrar el horario' });
   }
};

export const obtenerHorariosEmpleadoController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const empleadoId = Number(id);
      if (!empleadoId || isNaN(empleadoId)) {
         res.status(400).json({ message: 'EmpleadoId inválido' });
         return;
      }

      const horarios = await obtenerHorariosEmpleadoService(empleadoId);
      res.status(200).json(horarios);
   } catch (error: any) {
      console.error('Error en obtenerHorariosEmpleadoController:', error);
      res.status(500).json({ message: 'Error al obtener los horarios' });
   }
};

export const obtenerHorarioDeHoyController = async (
   req: Request,
   res: Response
) => {
   try {
      const { id } = req.params;
      const fechaRaw = req.query.fecha;

      let fechaStr: string | undefined;
      if (Array.isArray(fechaRaw)) {
         if (typeof fechaRaw[0] === 'string') fechaStr = fechaRaw[0];
      } else if (typeof fechaRaw === 'string') {
         fechaStr = fechaRaw;
      }

      if (!id || isNaN(Number(id))) {
         res.status(400).json({ message: 'EmpleadoId inválido' });
         return;
      }

      if (!fechaStr) {
         res.status(400).json({ message: 'Fecha inválida' });
         return;
      }

      const horario = await obtenerHorarioDeHoyService(Number(id), fechaStr);
      if (!horario) {
         res.status(404).json({ message: 'Empleado no encontrado' });
         return;
      }
      res.status(200).json({
         message: 'Horario de hoy obtenido correctamente',
         data: horario,
      });
   } catch (error: any) {
      console.log(error);
      if (error.status == 404) {
         res.status(404).json(error.message);
      }
      res.status(500).json({ message: 'Error al obtener el horario de hoy' });
   }
};
