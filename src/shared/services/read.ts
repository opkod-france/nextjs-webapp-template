import { RawAxiosRequestConfig } from 'axios';
import { get } from 'lodash';

import api from './api';
import ENDPOINTS, { Entity } from './endpoints';
const read = async <T>(
  entity: Entity,
  id: number,
  params?: RawAxiosRequestConfig['params']
): Promise<T> => {
  const endpoint = get(ENDPOINTS, entity);
  if (!endpoint) {
    throw new Error(`unknown entity ${entity}`);
  }
  try {
    const response = await api.get(`${endpoint as string}/${id}`, { params });
    return response.data as T;
  } catch (error) {
    //dirty hack to get the error message from strapi
    throw new Error(error as any);
  }
};

export default read;
