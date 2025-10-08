import { AppDataSource } from '../config/data-source';
import { stockDTO } from '../DTOs/stockDTO';

import { Stock } from '../entities/Stock';
import { Usuario } from '../entities/Usuario';

export const registrarStockService = async (data: stockDTO[]) => {
   const stockRepo = AppDataSource.getRepository(Stock);
   const usuarioRepo = AppDataSource.getRepository(Usuario);

   if (data.length === 0) {
      throw new Error('No se recibieron movimientos de stock');
   }

   const usuarioId = data[0].usuarioId;
   const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
   if (!usuario) {
      throw new Error('Empresa no encontrada');
   }

   const resultados: Stock[] = [];

   for (const item of data) {
      const { codigo, cantidad, precioCompra } = item;

      let stockExistente = await stockRepo.findOne({
         where: {
            codigo,
            usuario: { id: usuarioId },
         },
         relations: ['usuario'],
      });

      if (stockExistente) {
         // Reemplazar datos
         stockExistente.cantidad = cantidad;
         stockExistente.precioCompra = precioCompra;
         resultados.push(await stockRepo.save(stockExistente));
      } else {
         const nuevoStock = stockRepo.create({
            codigo,
            cantidad,
            precioCompra,
            usuario,
         });

         resultados.push(await stockRepo.save(nuevoStock));
      }
   }
   return resultados;
};

export const mostrarStockPorEmpresaIdService = async (usuarioId: number) => {
   const stockRepo = AppDataSource.getRepository(Stock);
   const usuarioRepo = AppDataSource.getRepository(Usuario);

   const usuario = await usuarioRepo.findOneBy({ id: usuarioId });
   if (!usuario) {
      throw new Error('Empresa no encontrada');
   }

   const stockDeLaEmpresa = await stockRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
   });

   return stockDeLaEmpresa;
};
