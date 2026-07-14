import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Etudiant } from '../../etudiant/entities/etudiant.entity';
import { UE } from '../../ue/entities/ue.entity';

@Entity()
export class Anonymat {

  @PrimaryGeneratedColumn()
  id_anonymat!: number;

  @Column({
    unique: true,
  })
  code_anonymat!: string;

  @Column({
    default: false,
  })
  is_rattrapage!: boolean;

  @ManyToOne(
    () => Etudiant,
    { eager: true },
  )
  @JoinColumn({
    name: 'id_etudiant',
  })
  etudiant!: Etudiant;

  @ManyToOne(
    () => UE,
    { eager: true },
  )
  @JoinColumn({
    name: 'id_ue',
  })
  ue!: UE;
}