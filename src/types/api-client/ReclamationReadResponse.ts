import { StrapiBaseReadResponse } from './StrapiBaseReadResponse';

export interface Reclamation {
  nom: string;
}

export type ReclamationReadResponse = StrapiBaseReadResponse<Reclamation>;
