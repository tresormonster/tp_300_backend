import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {

  @PrimaryGeneratedColumn()
  id_admin!: number;

  @Column({
    length: 100,
  })
  nom!: string;

  @Column({
    length: 100,
  })
  prenom!: string;

  @Column({
    unique: true,
    length: 150,
  })
  email!: string;

  @Column()
  mot_de_passe!: string;
}