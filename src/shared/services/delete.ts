import { AxiosResponse } from 'axios';
import { get } from 'lodash';

import api from './api';
import ENDPOINTS, { Entity } from './endpoints';

const deleteEntity = ({
  entity,
  id,
}: {
  entity: Entity;
  id: number;
}): Promise<AxiosResponse> => {
  const endpoint = get(ENDPOINTS, entity);
  return api.delete(`${endpoint as string}/${id}`);
};

export default deleteEntity;
