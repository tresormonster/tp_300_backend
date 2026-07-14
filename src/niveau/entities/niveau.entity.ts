import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cycle } from 'src/cycle/entities/cycle.entity';
import { Filiere } from 'src/filiere/entities/filiere.entity';
import { OneToMany } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';

import { UE } from 'src/ue/entities/ue.entity';

@Entity()
export class Niveau {

  @PrimaryGeneratedColumn()
  id_niveau!: number;

  @Column({ unique: true })
  nom_niveau!: string;

  @ManyToOne(() => Cycle, (cycle) => cycle.niveaux)
  @JoinColumn({ name: 'id_cycle' })
  cycle!: Cycle;

  @ManyToOne(() => Filiere, (filiere) => filiere.niveaux)
  @JoinColumn({ name: 'id_filiere' })
  filiere!: Filiere;
  @OneToMany(() => Etudiant, (etudiant) => etudiant.niveau)
etudiants!: Etudiant[];


@OneToMany(() => UE, (ue) => ue.niveau)
ues!: UE[];
}