import { AppDataSource } from '../config/data-source';
import { archivoDTO } from '../DTOs/archivoDTO';
import { Archivo } from '../entities/Archivo';
import { Usuario } from '../entities/Usuario';
import { RolEnum } from '../enums/RolEnum';
import fs from 'fs/promises';
import path from 'path';
import { formatearTipoArchivo } from '../utils/formatearTipoArchivo';

const archivoRepo = AppDataSource.getRepository(Archivo);
const usuarioRepo = AppDataSource.getRepository(Usuario);

export const subirImagenService = async (data: archivoDTO) => {
   if (!data.nombre || !data.url) {
      throw new Error('Datos del archivo incompletos');
   }

   const remitente = await usuarioRepo.findOne({
      where: { id: data.remitenteId },
   });
   if (!remitente) throw new Error('Remitente no encontrado');

   let destinatario;

   if (remitente.rol === 'Admin') {
      // El admin envía al usuario
      destinatario = await usuarioRepo.findOne({
         where: { id: data.destinatarioId },
      });
      if (!destinatario) throw new Error('Destinatario no encontrado');
   } else {
      // El usuario envía siempre al admin
      destinatario = await usuarioRepo.findOne({
         where: { rol: RolEnum.ADMIN },
      });
      if (!destinatario) throw new Error('No se encontró un administrador');
   }

   // Generar título del archivo
   const fecha = new Date();
   const fechaFormateada = fecha.toLocaleDateString('es-UY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
   });

   const tipoLegible = formatearTipoArchivo(data.tipo);
   const titulo = `Registro ${tipoLegible} - ${fechaFormateada}`;

   const archivo = archivoRepo.create({
      nombre: data.nombre,
      titulo,
      url: data.url,
      tipo: data.tipo,
      descripcion: data.descripcion,
      remitente,
      destinatario,
      subidoPorAdmin: remitente.rol === 'Admin',
   });

   await archivoRepo.save(archivo);
   return archivo;
};

interface ObtenerArchivosFiltro {
   usuarioId: number;
   tipo?: string;
}

export const obtenerArchivosFiltrosService = async ({
   usuarioId,
   tipo,
}: ObtenerArchivosFiltro) => {
   let where: any = [
      { remitente: { id: usuarioId } },
      { destinatario: { id: usuarioId } },
   ];

   if (tipo) {
      where = where.map((cond: any) => ({ ...cond, tipo }));
   }

   const archivos = await archivoRepo.find({
      where,
      order: { fechaSubida: 'DESC' },
      relations: ['remitente', 'destinatario'],
   });

   return archivos;
};

export const eliminarArchivoService = async (id: number) => {
   const archivo = await archivoRepo.findOne({
      where: { id },
      relations: ['remitente', 'destinatario'],
   });

   if (!archivo) throw new Error('Archivo no encontrado');

   await archivoRepo.remove(archivo);

   if (archivo.nombre) {
      const filePath = path.join(process.cwd(), 'uploads', archivo.nombre);
      try {
         await fs.unlink(filePath);
      } catch (error: any) {
         console.error('Error al eliminar el archivo físico:', error.message);
         // No lanzamos error aquí, porque la base de datos ya fue limpiada
      }
   }

   return { message: 'Archivo eliminado correctamente' };
};

export const descargarArchivoService = async (id: number) => {
   const archivo = await archivoRepo.findOne({ where: { id } });

   if (!archivo) {
      throw new Error('Archivo no encontrado');
   }

   const filePath = path.join(process.cwd(), 'uploads', archivo.nombre);

   return {
      filePath,
      nombre: archivo.nombre,
   };
};
