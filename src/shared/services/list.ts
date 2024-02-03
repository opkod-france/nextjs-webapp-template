import { RawAxiosRequestConfig } from 'axios';

import api from './api';
import ENDPOINTS, { Entity } from './endpoints';
const list = async <T>(
  entity: Entity,
  params?: RawAxiosRequestConfig['params']
): Promise<T> => {
  const endpoint = ENDPOINTS[entity];
  if (!endpoint) {
    throw new Error(`unknown entity ${entity}`);
  }
  console.log('endpoint---->', endpoint, params);
  const { data } = await api.get(`${endpoint}`, { params });
  return data;
};

export default list;
