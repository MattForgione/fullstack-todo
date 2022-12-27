import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoList } from '../todo-list/todo-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => TodoList, todoList => todoList.user)
  todoLists: TodoList[];
}
