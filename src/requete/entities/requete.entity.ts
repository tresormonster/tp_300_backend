import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Etudiant } from '../../etudiant/entities/etudiant.entity';
import { Enseignant } from '../../enseignant/entities/enseignant.entity';
import { UE } from '../../ue/entities/ue.entity';

@Entity()
export class Requete {

  @PrimaryGeneratedColumn()
  id_requete!: number;

  @Column()
  objet!: string;

  @Column('text')
  message!: string;

  @Column({
    nullable: true,
  })
  reponse!: string;

  @Column({
    default: 'EN_ATTENTE',
  })
  statut!: string;

  @ManyToOne(() => Etudiant)
  @JoinColumn({ name: 'id_etudiant' })
  etudiant!: Etudiant;

  @ManyToOne(() => Enseignant)
  @JoinColumn({ name: 'id_enseignant' })
  enseignant!: Enseignant;

  @ManyToOne(() => UE)
  @JoinColumn({ name: 'id_ue' })
  ue!: UE;
}