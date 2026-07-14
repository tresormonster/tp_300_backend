import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enseignement } from 'src/enseignement/entities/enseignement.entity';

@Entity()
export class Enseignant {

  @PrimaryGeneratedColumn()
  id_enseignant!: number;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  mot_de_passe!: string;

  @OneToMany(() => Enseignement, (ens) => ens.enseignant)
  enseignements!: Enseignement[];
}