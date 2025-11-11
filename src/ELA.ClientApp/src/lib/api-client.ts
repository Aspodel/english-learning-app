import axios, { type InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { toast } from 'sonner';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = 'application/json';
  return config;
}

export const apiClient = axios.create({
  baseURL: env.API_URL,
});

apiClient.interceptors.request.use(authRequestInterceptor);
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log('[API CLIENT] log: ', message);

    toast.error('Error', {
      description: message,
      duration: 5000,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.auth.signin.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
