import { z } from 'zod';
import {
  useMutation,
  useQuery,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { api } from '@/lib/api-client';

const authKey = ['authenticated-user'];

// Validation schemas
const authCredentialsSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Required'),
});
type AuthCredentials = z.infer<typeof authCredentialsSchema>;

const signUpCredentialsSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Required'),
  email: z.string().min(1, 'Required').optional(),
  firstName: z.string().min(1, 'Required').optional(),
  lastName: z.string().min(1, 'Required').optional(),
});
type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;

// API call functions
const getUser = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return response.data;
};

const requestWithCredentials = async <T>(url: string, data: T) => {
  const response = await api.post(url, data);
  return response.data;
};

// Hooks
const useApiQuery = <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T>({
    queryKey,
    queryFn,
    ...options,
  });
};

const useApiMutation = <T, U>(
  mutationFn: (data: U) => Promise<T>,
  options?: Omit<UseMutationOptions<T, Error, U>, 'mutationFn'>
) => {
  return useMutation<T, Error, U>({
    mutationFn,
    ...options,
  });
};

// API hooks
const useUser = (
  options?: Omit<
    UseQueryOptions<User, Error, User, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => useApiQuery(authKey, getUser, options);

const useSignIn = (
  options?: Omit<
    UseMutationOptions<AuthResponse, Error, AuthCredentials>,
    'mutationFn'
  >
) =>
  useApiMutation<AuthResponse, AuthCredentials>(
    (data) => requestWithCredentials('/auth/login', data),
    options
  );

const useSignUp = (
  options?: Omit<
    UseMutationOptions<SignUpResponse, Error, SignUpCredentials>,
    'mutationFn'
  >
) =>
  useApiMutation<SignUpResponse, SignUpCredentials>(
    (data) => requestWithCredentials('/auth/register', data),
    options
  );

const useSignOut = (
  options?: Omit<UseMutationOptions<unknown, Error, void>, 'mutationFn'>
) =>
  useApiMutation<unknown, void>(async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }, options);

export { useUser, useSignIn, useSignUp, useSignOut };
