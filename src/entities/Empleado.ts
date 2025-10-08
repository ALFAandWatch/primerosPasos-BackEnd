import {
   Column,
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

import { Horario } from './Horario';
import { Usuario } from './Usuario';

@Entity()
export class Empleado {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   nombre!: string;

   @Column()
   apellido!: string;

   @Column()
   cedula!: string;

   @ManyToOne(() => Usuario, (usuario) => usuario.empleados, {
      onDelete: 'CASCADE',
   })
   usuario!: Usuario;

   @OneToMany(() => Horario, (horario) => horario.empleado)
   horarios?: Horario[];

   @Column({ default: true })
   activo!: boolean;
}
