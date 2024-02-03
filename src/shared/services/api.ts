import Axios from 'axios';
import get from 'lodash/get';
import { getSession } from 'next-auth/react';
export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
  },
});
api.interceptors.request.use(async config => {
  const session = await getSession();
  const accessToken = get(session, 'access_token', null);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
