import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Empleado } from './Empleado';

@Entity()
export class Horario {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ type: 'date' })
   fecha!: string;

   @Column({ type: 'time', nullable: true })
   entrada!: string;

   @Column({ type: 'time', nullable: true })
   salida!: string;

   @Column({
      type: 'enum',
      enum: ['presente', 'falta', 'salud', 'vacaciones', 'libre', ''],
      default: 'presente',
   })
   estado!: string;

   @ManyToOne(() => Empleado, (empleado) => empleado.horarios)
   empleado!: Empleado;
}
