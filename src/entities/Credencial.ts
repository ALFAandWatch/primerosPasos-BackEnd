import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Credencial {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   email!: string;

   @Column()
   password!: string;

   @OneToOne(() => Usuario, (usuario) => usuario.credencial, {
      onDelete: 'CASCADE',
   })
   usuario!: Usuario;
}
