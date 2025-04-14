import { Asignatura } from './Asignatura';
import { Entidad } from './Entidad';
import { Meta } from './Meta';
import { Profesor } from './Profesor';

export interface Iniciativa {
  iD_INICIATIVA: number;
  titulo: string;
  horas: number;
  fecha_INICIO: string;
  fecha_FIN: string;
  descripcion: string;
  tipo: string;
  productO_FINAL: string;
  nueva: boolean;
  difusion: string;
  iD_ASIGNATURAs: Asignatura[];
  iD_ENTIDADs: Entidad[];
  iD_METAs: Meta[];
  iD_PROFESORs: Profesor[];
}
