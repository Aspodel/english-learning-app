import axios, { type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { env } from '@/config/env';
import { paths } from '@/config/paths';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjA5OGE1My1kMmNlLTRjMGYtYjExNy02NTY0ODY3NzRjYzIiLCJ1bmlxdWVfbmFtZSI6InVzZXIiLCJleHAiOjE3NjA4MDc1OTQsImlzcyI6IkVMQS5BcGkiLCJhdWQiOiJFTEEuQ2xpZW50In0.mgmWwHtOYV-o5r5c6oCQKYyberxTcpECfsT3Nc10hgw';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
}

export const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    toast.error('Error', {
      description: message,
      duration: 5000,
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = paths.auth.signin.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);
