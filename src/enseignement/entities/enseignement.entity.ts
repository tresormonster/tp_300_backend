import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Enseignant } from 'src/enseignant/entities/enseignant.entity';
import { UE } from 'src/ue/entities/ue.entity';

@Entity()
export class Enseignement {

  @PrimaryGeneratedColumn()
  id_enseignement!: number;

  @Column()
  annee_academique!: string;

  @ManyToOne(() => Enseignant, (enseignant) => enseignant.enseignements)
  @JoinColumn({ name: 'id_enseignant' })
  enseignant!: Enseignant;

  @ManyToOne(() => UE, (ue) => ue.enseignements)
  @JoinColumn({ name: 'id_ue' })
  ue!: UE;
}