import { AxiosResponse } from 'axios';

import api from '$/shared/services/api';

const generatePDF = (entity: string, id: number): Promise<AxiosResponse> => {
  return api.get(`/api/generate-pdf/${id}?module=${entity}`);
};

export default generatePDF;
