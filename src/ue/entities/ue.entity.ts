import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Niveau } from 'src/niveau/entities/niveau.entity';
import { Enseignement } from 'src/enseignement/entities/enseignement.entity';
import { Note } from '../../note/entities/note.entity';
import { Anonymat } from '../../anonymat/entities/anonymat.entity';

@Entity()
export class UE {

  @PrimaryGeneratedColumn()
  id_ue!: number;

  @Column({ unique: true })
  code_ue!: string;

  @Column()
  nom_ue!: string;

  @Column()
  credit!: number;

  @Column({ default: false })
  has_tp!: boolean;
  @Column()
  semestre!: string;

  @ManyToOne(() => Niveau, (niveau) => niveau.ues)
  @JoinColumn({ name: 'id_niveau' })
  niveau!: Niveau;

  @OneToMany(() => Enseignement, (ens) => ens.ue)
  enseignements!: Enseignement[];
  @OneToMany(() => Note, (note) => note.ue)
notes!: Note[];
@OneToMany(() => Anonymat, (anonymat) => anonymat.ue)
anonymats!: Anonymat[];
}