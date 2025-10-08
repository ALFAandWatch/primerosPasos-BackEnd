import { AppDataSource } from '../config/data-source';
import { movimientoDTO } from '../DTOs/movimientoDTO';
import { Movimiento } from '../entities/Movimiento';
import { Usuario } from '../entities/Usuario';

export const crearMovimientoService = async (movimientos: movimientoDTO[]) => {
   const movimientoRepo = AppDataSource.getRepository(Movimiento);
   const usuarioRepo = AppDataSource.getRepository(Usuario);

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
   const movimientoRepo = AppDataSource.getRepository(Movimiento);

   const movimientos = await movimientoRepo.find({
      relations: ['usuario'],
   });
   return movimientos;
};
