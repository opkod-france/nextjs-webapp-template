import { StrapiBaseReadResponse } from './StrapiBaseReadResponse';

export interface Partner {
  commission?: number;
  nom: string;
  prenom?: number;
}

export type PartnerReadResponse = StrapiBaseReadResponse<Partner>;
