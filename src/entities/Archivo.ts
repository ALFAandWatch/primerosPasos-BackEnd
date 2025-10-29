import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   CreateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { ArchivoTipo } from '../enums/ArchivoTipo';

@Entity()
export class Archivo {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   nombre!: string;

   @Column()
   url!: string;

   @Column({ type: 'varchar', length: 255 })
   titulo!: string;

   @Column({
      type: 'enum',
      enum: ArchivoTipo,
      default: ArchivoTipo.OTRO,
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

   @ManyToOne(() => Usuario, (usuario) => usuario.archivosEnviados, {
      onDelete: 'CASCADE',
   })
   remitente!: Usuario;

   @ManyToOne(() => Usuario, (usuario) => usuario.archivosRecibidos, {
      onDelete: 'CASCADE',
   })
   destinatario!: Usuario;
}
