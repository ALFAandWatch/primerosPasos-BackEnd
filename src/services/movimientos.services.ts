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

export const mostrarTodosLosMovimientosService = async () => {
   const movimientos = await movimientoRepo.find({
      relations: ['usuario'],
   });
   return movimientos;
};

// ============================
// RUTAS DE ADMIN
// ============================

// export const mostrarMovimientosLLService = async (
//    offset: number = 0,
//    limit: number = 15,
//    usuarioId?: number
// ) => {
//    const where: any = {};

//    if (usuarioId) {
//       where.usuario = { id: usuarioId }; // ajusta según tu entidad
//    }

//    const [items, total] = await movimientoRepo.findAndCount({
//       relations: ['usuario'],
//       skip: offset,
//       take: limit,
//       where,
//       order: { fechaRegistro: 'DESC' },
//    });

//    return { items, total };
// };
