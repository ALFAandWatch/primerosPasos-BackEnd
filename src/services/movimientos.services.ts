import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { movimientoDTO } from '../DTOs/movimientoDTO';
import { Movimiento } from '../entities/Movimiento';
import { Usuario } from '../entities/Usuario';

const movimientoRepo = AppDataSource.getRepository(Movimiento);
const usuarioRepo = AppDataSource.getRepository(Usuario);

export const crearMovimientoService = async (movimientos: movimientoDTO[]) => {
   const resultados: Movimiento[] = [];

   for (const mov of movimientos) {
      const { tipo, formaPago, codigo, precio, cantidad, fecha, usuarioId } =
         mov;

      const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
      if (!usuario) {
         throw new Error('Usuario no encontrado');
      }

      const nuevoMovimiento = movimientoRepo.create({
         tipo,
         formaPago,
         codigo,
         precio,
         cantidad,
         fecha,
         usuario,
      });

      const guardado = await movimientoRepo.save(nuevoMovimiento);
      resultados.push(guardado);
   }

   return resultados;
};

export const mostrarRegistrosAlUsuarioService = async (
   usuarioId?: number,
   filters?: {
      tipo?: 'venta' | 'compra';
      formaPago?: 'contado' | 'credito';
   }
) => {
   const where: FindOptionsWhere<Movimiento> = { usuario: undefined };

   // filtro por usuario
   if (usuarioId) where.usuario = { id: usuarioId } as any;

   // filtros opcionales
   if (filters?.tipo) where.tipo = filters.tipo;
   if (filters?.formaPago) where.formaPago = filters.formaPago;

   const [items, total] = await movimientoRepo.findAndCount({
      relations: ['usuario'],
      where,
      order: { fecha: 'DESC' },
   });

   return {
      items,
      total,
   };
};

export const mostrarTodosLosMovimientosService = async () => {
   const movimientos = await movimientoRepo.find({
      relations: ['usuario'],
   });
   return movimientos;
};

// ============================
// RUTAS DE ADMIN
// ============================

export const mostrarMovimientosService = async (
   usuarioId?: number,
   filters?: {
      tipo?: 'venta' | 'compra';
      formaPago?: 'contado' | 'credito';
   }
) => {
   const where: FindOptionsWhere<Movimiento> = { usuario: undefined };

   // filtro por usuario
   if (usuarioId) where.usuario = { id: usuarioId } as any;

   // filtros opcionales
   if (filters?.tipo) where.tipo = filters.tipo;
   if (filters?.formaPago) where.formaPago = filters.formaPago;

   const [items, total] = await movimientoRepo.findAndCount({
      relations: ['usuario'],
      where,
      order: { fecha: 'DESC' },
   });

   return {
      items,
      total,
   };
};

export const editarMovimientoService = async (
   id: number,
   data: movimientoDTO
) => {
   const movimiento = await movimientoRepo.findOne({ where: { id } });

   if (!movimiento) {
      throw new Error('Movimiento no encontrado');
   }

   Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
         (movimiento as any)[key] = value;
      }
   });

   const guardado = await movimientoRepo.save(movimiento);

   return guardado;
};

export const deleteMovimientoService = async (id: number) => {
   const movimiento = await movimientoRepo.findOne({ where: { id } });

   if (!movimiento) {
      throw new Error('Movimiento no encontrado');
   }

   await movimientoRepo.remove(movimiento);

   return { message: 'Movimiento eliminado correctamente', id };
};
