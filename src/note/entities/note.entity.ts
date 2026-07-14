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
export class Note {

  @PrimaryGeneratedColumn()
  id_note!: number;

  @Column({
  type: 'float',
  nullable: true,
})
note_cc!: number | null;

@Column({
  type: 'float',
  nullable: true,
})
note_tp!: number | null;

@Column({
  type: 'float',
  nullable: true,
})
note_sn!: number | null;

@Column({
  type: 'float',
  nullable: true,
})
note_sn_initiale!: number | null;

@Column({
  type: 'float',
  nullable: true,
})
note_finale!: number | null;

  @Column({
    default: false,
  })
  publie!: boolean;

  @Column({
    default: false,
  })
  est_rattrapage!: boolean;

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
   
  @Column({
  nullable: true,
})
decision!: string;


@Column({
  default: false,
})
est_rattrapable!: boolean;

@Column({
  default: false,
})
valide!: boolean;
}