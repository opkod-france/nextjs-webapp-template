import { AxiosResponse } from 'axios';
import { FormikValues } from 'formik';
import { get } from 'lodash';


import api from '@/shared/services/api';
import { convertToFormData } from '@/shared/services/utils';

import ENDPOINTS, { Entity } from './endpoints';

const update = (
  entity: Entity,
  values: FormikValues
): Promise<AxiosResponse> => {
  const endpoint = get(ENDPOINTS, entity) as string;
  const formData = convertToFormData(values);
  return api.put(`${endpoint}/${values.id}`, formData);
};

export default update;
