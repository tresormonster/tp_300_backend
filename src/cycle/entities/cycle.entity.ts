import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Niveau } from 'src/niveau/entities/niveau.entity';

@Entity()
export class Cycle {

  @PrimaryGeneratedColumn()
  id_cycle!: number;

  @Column({ unique: true })
  nom_cycle!: string;

  @OneToMany(() => Niveau, (niveau) => niveau.cycle)
  niveaux!: Niveau[];
}