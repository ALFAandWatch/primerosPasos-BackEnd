import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   CreateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';

export enum ArchivoTipo {
   TICKET = 'ticket',
   RECIBO = 'recibo',
   PDF = 'pdf',
   IMAGEN = 'imagen',
   OTRO = 'otro',
}

@Entity()
export class Archivo {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   nombre!: string;

   @Column()
   url!: string;

   @Column({
      type: 'enum',
      enum: ArchivoTipo,
      default: ArchivoTipo.IMAGEN,
   })
   tipo!: ArchivoTipo;

   @Column({ nullable: true })
   descripcion?: string;

   @ManyToOne(() => Usuario, (usuario) => usuario.archivos)
   usuario!: Usuario;

   @Column({ nullable: true })
   subidoPorAdmin?: boolean;

   @CreateDateColumn()
   fechaSubida!: Date;
}
