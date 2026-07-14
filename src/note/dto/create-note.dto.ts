export class CreateNoteDto {

  id_etudiant!: number;

  id_ue!: number;

  id_anonymat?: number;

  note_cc?: number;

  note_tp?: number;

  note_sn?: number;

  publie?: boolean;
}