import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Todo } from './todo.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.todoLists)
  user: User;

  @OneToMany(() => Todo, todo => todo.todoList)
  todos: Todo[];
}
