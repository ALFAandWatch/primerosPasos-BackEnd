import { AppDataSource } from '../config/data-source';
import { archivoDTO } from '../DTOs/archivoDTO';
import { Archivo, ArchivoTipo } from '../entities/Archivo';
import { Usuario } from '../entities/Usuario';

const archivoRepo = AppDataSource.getRepository(Archivo);
const usuarioRepo = AppDataSource.getRepository(Usuario);

export const subirImagenService = async (data: archivoDTO) => {
   const usuario = await usuarioRepo.findOne({ where: { id: data.usuarioId } });
   if (!usuario) throw new Error('Usuario no encontrado');

   const archivo = archivoRepo.create({
      nombre: data.nombre,
      url: data.url,
      tipo: data.tipo,
      descripcion: data.descripcion,
      usuario,
      subidoPorAdmin: usuario.rol === 'Admin',
   });

   await archivoRepo.save(archivo);
   return archivo;
};

export const obtenerArchivosPorUsuarioIdService = async (usuarioId: number) => {
   const archivos = await archivoRepo.find({
      where: { usuario: { id: usuarioId } },
      order: { fechaSubida: 'DESC' },
      relations: ['usuario'],
   });

   return archivos;
};
