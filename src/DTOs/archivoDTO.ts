import { ArchivoTipo } from '../entities/Archivo';

export type archivoDTO = {
   nombre: string;
   url: string;
   tipo: ArchivoTipo;
   descripcion?: string;
   usuarioId: number;
};
