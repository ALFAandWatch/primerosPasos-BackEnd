import { ArchivoTipo } from '../enums/ArchivoTipo';

export type archivoDTO = {
   nombre: string;
   url: string;
   tipo: ArchivoTipo;
   descripcion?: string;
   remitenteId: number;
   destinatarioId?: number;
};
