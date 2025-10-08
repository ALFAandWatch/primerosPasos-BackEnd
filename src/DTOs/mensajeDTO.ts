export type mensajeDTO = {
   remitenteId: number | 'admin';
   destinatarioId: number | 'admin';
   asunto: string;
   contenido: string;
};
