import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/Usuario';
import { RolEnum } from '../enums/RolEnum';

export const traerTodasLasEmpresasService = async () => {
   const usuarioRepo = AppDataSource.getRepository(Usuario);

   const empresas = await usuarioRepo.find({
      where: { rol: RolEnum.EMPRESA },
      relations: ['credencial'],
   });

   return empresas;
};
