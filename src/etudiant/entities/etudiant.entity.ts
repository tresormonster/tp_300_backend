import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Niveau } from '../../niveau/entities/niveau.entity';
import { OneToMany } from 'typeorm';
import { Note } from '../../note/entities/note.entity';
import { Anonymat } from '../../anonymat/entities/anonymat.entity';
import { ImportEtudiant } from '../../import-etudiant/entities/import-etudiant.entity';
@Entity()
export class Etudiant {

  @PrimaryGeneratedColumn()
  id_etudiant!: number;

  @Column({ unique: true })
  matricule!: string;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column({ type: 'date', nullable: true })
  date_naissance!: Date;

  @Column({ nullable: true })
  lieu_naissance!: string;

 @Column({
  type: 'varchar',
  unique: true,
  nullable: true,
})
email!: string;

  

 @Column({
  type: 'varchar',
  nullable: true,
})
mot_de_passe!: string | null;


@Column({ default: false })
compte_active!: boolean;

  // 🔥 CORRECTION IMPORTANTE ICI
  @ManyToOne(() => Niveau, niveau => niveau.etudiants, { nullable: false })
@JoinColumn({ name: 'id_niveau' })
niveau!: Niveau;


@OneToMany(() => Note, (note) => note.etudiant)
notes!: Note[];
@OneToMany(() => Anonymat, (anonymat) => anonymat.etudiant)
anonymats!: Anonymat[];

@ManyToOne(
  () => ImportEtudiant,
  (importEtudiant) => importEtudiant.etudiants,
  {
    nullable: true,
    onDelete: 'CASCADE',
  },
)
@JoinColumn({ name: 'id_import' })
importEtudiant!: ImportEtudiant | null;

}