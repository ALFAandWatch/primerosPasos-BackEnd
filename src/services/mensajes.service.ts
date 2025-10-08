import { AppDataSource } from '../config/data-source';
import { mensajeDTO } from '../DTOs/mensajeDTO';
import { Mensaje } from '../entities/Mensaje';
import { Usuario } from '../entities/Usuario';

const mensajeRepo = AppDataSource.getRepository(Mensaje);
const usuarioRepo = AppDataSource.getRepository(Usuario);

export const enviarMensajeService = async (mensajeData: mensajeDTO) => {
   const { remitenteId, destinatarioId, asunto, contenido } = mensajeData;

   const getUsuario = async (id: number | 'admin') => {
      const usuarioId = id === 'admin' ? 2 : id;
      return await usuarioRepo.findOneByOrFail({ id: usuarioId });
   };

   const remitenteUsuario = await getUsuario(remitenteId);
   const destinatarioUsuario = await getUsuario(destinatarioId);

   const mensaje = mensajeRepo.create({
      remitente: remitenteUsuario,
      destinatario: destinatarioUsuario,
      contenido,
      asunto,
   });

   return await mensajeRepo.save(mensaje);
};

export const obtenerTodosLosMensajesService = async (
   usuarioId: number | 'admin'
) => {
   const getUsuario = async (id: number | 'admin') => {
      const usuarioId = id === 'admin' ? 2 : id;
      return await AppDataSource.getRepository(Usuario).findOneByOrFail({
         id: usuarioId,
      });
   };

   const usuario = await getUsuario(usuarioId);

   const enviados = await AppDataSource.getRepository(Mensaje).find({
      where: { remitente: { id: usuario.id } },
      relations: ['remitente', 'destinatario'],
   });

   const recibidos = await AppDataSource.getRepository(Mensaje).find({
      where: { destinatario: { id: usuario.id } },
      relations: ['remitente', 'destinatario'],
   });

   // Unimos y ordenamos por fecha
   return [...enviados, ...recibidos].sort(
      (a, b) => b.fechaEnvio.getTime() - a.fechaEnvio.getTime()
   );
};

export const obtenerMensajesRecibidosService = async (
   usuarioId: number | 'admin'
) => {
   const getUsuario = async (id: number | 'admin') => {
      const usuarioId = id === 'admin' ? 2 : id;
      return await usuarioRepo.findOneByOrFail({ id: usuarioId });
   };

   const usuario = await getUsuario(usuarioId);

   return await mensajeRepo.find({
      where: { destinatario: { id: usuario.id } },
      order: { fechaEnvio: 'DESC' },
      relations: ['remitente', 'destinatario'],
   });
};

export const obtenerMensajesEnviadosService = async (
   usuarioId: number | 'admin'
) => {
   const getUsuario = async (id: number | 'admin') => {
      const usuarioId = id === 'admin' ? 2 : id;
      return await usuarioRepo.findOneByOrFail({ id: usuarioId });
   };

   const usuario = await getUsuario(usuarioId);

   return await mensajeRepo.find({
      where: { remitente: { id: usuario.id } },
      order: { fechaEnvio: 'DESC' },
      relations: ['remitente', 'destinatario'],
   });
};

export const obtenerMensajePorIdService = async (
   id: number
): Promise<Mensaje> => {
   const mensaje = await mensajeRepo.findOne({
      where: { id },
      relations: ['remitente', 'destinatario'],
   });

   if (!mensaje) throw new Error('Mensaje no encontrado');

   return mensaje;
};

export const marcarComoLeidoService = async (mensajeId: number) => {
   const mensaje = await mensajeRepo.findOneBy({ id: mensajeId });
   if (!mensaje) throw new Error('Mensaje no encontrado');

   mensaje.leido = true;
   return await mensajeRepo.save(mensaje);
};
