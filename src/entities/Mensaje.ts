// src/entities/Mensaje.ts
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   CreateDateColumn,
   OneToMany,
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Mensaje {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ length: 200 })
   asunto!: string;

   @Column('text')
   contenido!: string;

   @ManyToOne(() => Usuario, (usuario) => usuario.mensajesEnviados, {
      eager: true,
   })
   remitente!: Usuario;

   @ManyToOne(() => Usuario, (usuario) => usuario.mensajesRecibidos, {
      eager: true,
   })
   destinatario!: Usuario;

   @ManyToOne(() => Mensaje, (mensaje) => mensaje.respuestas, {
      nullable: true,
   })
   mensajePadre?: Mensaje;

   @OneToMany(() => Mensaje, (mensaje) => mensaje.mensajePadre)
   respuestas?: Mensaje[];

   @CreateDateColumn({ type: 'timestamp' })
   fechaEnvio!: Date;

   @Column({ default: false })
   leido!: boolean;
}
