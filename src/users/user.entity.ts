import { Specie } from '../species/specie.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    default: new Date(),
  })
  created_at: Date;

  @Column({
    default: new Date(),
  })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(
    type => Specie,
    specie => specie.user,
  )
  species: Specie[];
}
