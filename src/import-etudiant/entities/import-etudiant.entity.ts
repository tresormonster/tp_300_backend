import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Etudiant } from '../../etudiant/entities/etudiant.entity';

@Entity()
export class ImportEtudiant {

  @PrimaryGeneratedColumn()
  id_import!: number;

  @Column()
  nom_fichier!: string;

  @Column()
  cycle!: string;

  @Column()
  filiere!: string;

  @Column()
  niveau!: string;

  @Column()
  nombre_etudiants!: number;

  @Column({
    default: 0,
  })
  importes!: number;

  @Column({
    default: 0,
  })
  ignores!: number;

  @CreateDateColumn()
  date_import!: Date;

  @OneToMany(
  () => Etudiant,
  (etudiant) => etudiant.importEtudiant,
)
etudiants!: Etudiant[];
}