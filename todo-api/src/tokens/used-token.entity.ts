import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
