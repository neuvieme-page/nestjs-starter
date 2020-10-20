import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity'

@Entity()
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  secret: string;

  @Column()
  provider: string;

  @ManyToOne(
    type => User,
    user => user.identities,
  )
  user: User;
}
