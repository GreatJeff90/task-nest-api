import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  priority: number;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User[]

  // @Column()
  // userId: number
}

{}