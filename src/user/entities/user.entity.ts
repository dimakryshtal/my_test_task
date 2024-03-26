import { Position } from '../../position/entities/position.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 15, unique: true })
  phone: string;

  @ManyToOne(() => Position, (position) => position.id)
  position: Position;

  @Column({ nullable: true })
  photo: string;
}
