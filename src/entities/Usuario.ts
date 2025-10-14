import {
   Column,
   Entity,
   JoinColumn,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { Credencial } from './Credencial';
import { RolEnum } from '../enums/RolEnum';

import { Stock } from './Stock';
import { Movimiento } from './Movimiento';
import { Empleado } from './Empleado';
import { Mensaje } from './Mensaje';
import { Archivo } from './Archivo';

@Entity()
export class Usuario {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({
      type: 'enum',
      enum: RolEnum,
   })
   rol!: RolEnum;

   @Column({ nullable: true })
   nombreEmpresa?: string;

   @Column()
   nombreTitular!: string;

   @Column({ nullable: true })
   cedula?: string;

   @Column({ nullable: true })
   domicilio?: string;

   @Column({ nullable: true })
   telefono?: string;

   @Column({ nullable: true })
   rut?: string;

   @Column({ nullable: true })
   actividad?: string;

   @Column({ type: 'date', default: () => 'CURRENT_DATE' })
   dateCreated!: string;

   @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
   movimientos?: Movimiento[];

   @OneToMany(() => Stock, (stock) => stock.usuario)
   stock?: Stock[];

   @OneToMany(() => Empleado, (empleado) => empleado.usuario)
   empleados?: Empleado[];

   @OneToOne(() => Credencial, (credencial) => credencial.usuario, {
      cascade: true,
   })
   @JoinColumn()
   credencial!: Credencial;

   @OneToMany(() => Mensaje, (mensaje) => mensaje.remitente)
   mensajesEnviados?: Mensaje[];

   @OneToMany(() => Mensaje, (mensaje) => mensaje.destinatario)
   mensajesRecibidos?: Mensaje[];

   @OneToMany(() => Archivo, (archivo) => archivo.usuario, {
      cascade: true,
   })
   archivos!: Archivo[];
}
