import { AppDataSource } from '../config/data-source';
import { horarioDTO } from '../DTOs/horarioDTO';
import { Empleado } from '../entities/Empleado';
import { Horario } from '../entities/Horario';

const horarioRepo = AppDataSource.getRepository(Horario);
const empleadoRepo = AppDataSource.getRepository(Empleado);

export const registrarHorarioService = async (data: horarioDTO) => {
   const { empleadoId, fecha } = data;

   const empleado = await empleadoRepo.findOneBy({ id: empleadoId });
   if (!empleado) {
      throw new Error('Empleado no encontrado');
   }

   let horario = await horarioRepo.findOne({
      where: { empleado: { id: empleadoId }, fecha },
      relations: ['empleado'],
   });

   if (horario) {
      horario.entrada = data.entrada;
      horario.salida = data.salida;
      horario.estado = data.estado;
   } else {
      horario = horarioRepo.create({
         fecha: data.fecha,
         entrada: data.entrada,
         salida: data.salida,
         estado: data.estado,
         empleado: empleado,
      });
   }

   const horarioGuardado = await horarioRepo.save(horario);
   return horarioGuardado;
};

export const obtenerHorariosEmpleadoService = async (empleadoId: number) => {
   const horarios = await horarioRepo.find({
      where: { empleado: { id: empleadoId } },
      order: { fecha: 'DESC' },
      relations: ['empleado'],
   });

   return horarios;
};

export const obtenerHorarioDeHoyService = async (
   empleadoId: number,
   fecha: string
) => {
   const empleado = await empleadoRepo.findOneBy({ id: empleadoId });
   if (!empleado) {
      return null;
   }

   const horario = await horarioRepo.findOne({
      where: {
         empleado: { id: empleadoId },
         fecha: fecha,
      },
      relations: ['empleado'],
   });

   if (!horario) {
      return {
         fecha: fecha,
         entrada: '',
         salida: '',
         estado: '',
         empleado: empleado,
      };
   }

   return horario;
};
