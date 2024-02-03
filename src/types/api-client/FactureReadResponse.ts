import { FactureModel } from '$/shared/models/FactureModel';

import { StrapiBaseReadResponse } from './StrapiBaseReadResponse';

export type FactureReadResponse = StrapiBaseReadResponse<FactureModel>;
