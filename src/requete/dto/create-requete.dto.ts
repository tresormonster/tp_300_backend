export class CreateRequeteDto {

  id_etudiant!: number;

  id_ue!: number;

  objet!: string;

  message!: string;

  pieces_jointes?: string[];
}