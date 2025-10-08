import { AppDataSource } from '../config/data-source';
import { credencialDTO } from '../DTOs/credencialDTO';
import { usuarioDTO } from '../DTOs/usuarioDTO';
import { Credencial } from '../entities/Credencial';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../entities/Usuario';
import { rolEnumMap, RolInput } from '../enums/RolEnum';

export const registrarUsuarioService = async (
   dataUsuario: usuarioDTO,
   dataCredencial: credencialDTO
): Promise<Usuario> => {
   return await AppDataSource.transaction(
      async (transactionalEntityManager) => {
         const credencialRepo =
            transactionalEntityManager.getRepository(Credencial);

         const emailExistente = await credencialRepo.findOneBy({
            email: dataCredencial.email,
         });
         if (emailExistente) {
            throw new Error('El email ya está registrado');
         }

         const hashedPassword = await bcrypt.hash(dataCredencial.password, 10);
         // 1️⃣ Crear credencial dentro de la transacción

         const credencial = credencialRepo.create({
            ...dataCredencial,
            password: hashedPassword,
         });

         // 2️⃣ Crear empresa y vincular la credencial
         const usuarioRepo = transactionalEntityManager.getRepository(Usuario);

         const rol = rolEnumMap[dataUsuario.rol as RolInput];

         const usuario = usuarioRepo.create({
            ...dataUsuario,
            rol,
            credencial,
         });

         return await usuarioRepo.save(usuario);
      }
   );
};

export const loginUsuarioService = async (dataLogin: credencialDTO) => {
   const { email, password } = dataLogin;

   const credencialRepo = AppDataSource.getRepository(Credencial);

   const credencial = await credencialRepo.findOne({
      where: { email },
      relations: ['usuario'],
   });

   if (!credencial) {
      throw new Error('Email o contraseña incorrectos');
   }

   const isMatch = await bcrypt.compare(password, credencial.password);
   if (!isMatch) {
      throw new Error('Email o contraseña incorrectos');
   }

   const token = jwt.sign(
      {
         id: credencial.usuario.id,
         email: credencial.email,
         rol: credencial.usuario.rol,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
   );

   return {
      message: 'Login exitoso',
      token,
      usuario: credencial.usuario,
   };
};
