import { RolEnum } from '../enums/RolEnum';

export type usuarioDTO = {
   rol: RolEnum;
   nombreEmpresa?: string;
   nombreTitular: string;
   cedula?: string;
   domicilio?: string;
   telefono?: string;
   rut?: string;
   actividad?: string;
};
