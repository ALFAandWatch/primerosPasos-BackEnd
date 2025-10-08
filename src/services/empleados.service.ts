import { ILike } from 'typeorm/find-options/operator/ILike';
import { AppDataSource } from '../config/data-source';
import { empleadoDTO } from '../DTOs/empleadoDTO';
import { Empleado } from '../entities/Empleado';
import { Usuario } from '../entities/Usuario';

const empleadoRepo = AppDataSource.getRepository(Empleado);
const empresaRepo = AppDataSource.getRepository(Usuario);

export const registrarEmpleadoService = async (empleado: empleadoDTO) => {
   const { nombre, apellido, cedula, usuarioId } = empleado;

   const usuario = await empresaRepo.findOneBy({ id: usuarioId });
   if (!usuario) {
      throw new Error('Empresa no encontrada');
   }

   const nuevoEmpleado = empleadoRepo.create({
      nombre,
      apellido,
      cedula,
      usuario,
      horarios: [],
   });

   await empleadoRepo.save(nuevoEmpleado);
   return nuevoEmpleado;
};

export const mostrarEmpleadosPorEmpresaIdService = async (
   empresaId: number
) => {
   const empleados = await empleadoRepo.find({
      where: { usuario: { id: empresaId }, activo: true },
      relations: ['horarios'],
   });

   return empleados;
};

export const mostrarEmpleadoPorIdService = async (id: number) => {
   const empleado = await empleadoRepo.findOne({
      where: { id },
      relations: ['horarios'],
   });

   if (!empleado) {
      throw new Error('Empleado no encontrado');
   }

   return empleado;
};

export const editarEmpleadoService = async (data: empleadoDTO, id: number) => {
   const { nombre, apellido, cedula } = data;

   const empleado = await empleadoRepo.findOneBy({ id });

   if (!empleado) {
      throw new Error('Empleado no encontrado');
   }

   empleado.nombre = nombre;
   empleado.apellido = apellido;
   empleado.cedula = cedula;

   await empleadoRepo.save(empleado);
   return empleado;
};

export const eliminarEmpleadoService = async (id: number) => {
   const empleado = await empleadoRepo.findOneBy({ id });

   if (!empleado) {
      throw new Error('Empleado no encontrado');
   }

   empleado.activo = false;
   await empleadoRepo.save(empleado);

   return empleado;
};

// ==========================
// RUTAS DE ADMIN
// ==========================

export const listarEmpleadosAdminService = async (
   page: number = 1,
   limit: number = 10,
   search: string = ''
) => {
   const skip = (page - 1) * limit;

   const [empleados, total] = await empleadoRepo.findAndCount({
      where: search ? { nombre: ILike(`%${search}%`) } : {},
      relations: ['usuario'],
      withDeleted: true,
      skip,
      take: limit,
      order: { id: 'ASC' },
   });

   return {
      data: empleados,
      total,
      page,
      totalPages: Math.ceil(total / limit),
   };
};

export const restaurarEmpleadoService = async (id: number) => {
   const empleado = await empleadoRepo.findOne({
      where: { id },
   });

   if (!empleado) {
      throw new Error('Empleado no encontrado');
   }

   if (empleado.activo) {
      return empleado; // ya estaba activo
   }

   empleado.activo = true;
   await empleadoRepo.save(empleado);

   return empleado;
};
