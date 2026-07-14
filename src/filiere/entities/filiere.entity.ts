import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Niveau } from 'src/niveau/entities/niveau.entity';

@Entity()

export class Filiere {

  @PrimaryGeneratedColumn()
  id_filiere!: number;

  @Column({ unique: true })
  nom_filiere!: string;

  @OneToMany(() => Niveau, (niveau) => niveau.filiere)
  niveaux!: Niveau[];
}