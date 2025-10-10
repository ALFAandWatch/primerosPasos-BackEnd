import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/Usuario';
import { RolEnum } from '../enums/RolEnum';

const usuarioRepo = AppDataSource.getRepository(Usuario);

export const traerTodasLasEmpresasService = async () => {
   const empresas = await usuarioRepo.find({
      where: { rol: RolEnum.EMPRESA },
      relations: ['credencial'],
   });

   return empresas;
};

export const traerEmpresaPorIdService = async (id: number) => {
   const empresa = await usuarioRepo.findOne({
      where: { id, rol: RolEnum.EMPRESA },
      relations: ['credencial'],
   });

   return empresa;
};
