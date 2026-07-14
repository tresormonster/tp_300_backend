export class CreateEtudiantDto {
  matricule!: string;
  nom!: string;
  prenom!: string;
  date_naissance?: Date;
  lieu_naissance?: string;
  email?: string;
  mot_de_passe!: string;

  // 🔥 IMPORTANT
  id_niveau!: number;
}