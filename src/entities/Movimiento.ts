import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Movimiento {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ type: 'enum', enum: ['venta', 'compra'] })
   tipo!: 'venta' | 'compra';

   @Column({ type: 'enum', enum: ['contado', 'credito'] })
   formaPago!: 'contado' | 'credito';

   @Column()
   codigo!: string;

   @Column('decimal', { precision: 10, scale: 2 })
   precio!: number;

   @Column()
   cantidad!: number;

   @Column({ type: 'date' })
   fecha!: string;

   @ManyToOne(() => Usuario, (usuario) => usuario.movimientos)
   usuario!: Usuario;
}
