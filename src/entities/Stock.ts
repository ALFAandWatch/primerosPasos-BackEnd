import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Stock {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   codigo!: string;

   @Column('int')
   cantidad!: number;

   @Column('decimal', { precision: 10, scale: 2 })
   precioCompra!: number;

   @ManyToOne(() => Usuario, (usuario) => usuario.stock)
   usuario!: Usuario;
}
