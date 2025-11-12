import type { AxiosInstance } from 'axios';
import type { QueryKey } from '@tanstack/react-query';

export interface ApiService<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  getAll: (params?: Record<string, any>) => Promise<T[]>;
  getPaginated: (
    params?: PaginationParams & Record<string, any>
  ) => Promise<PaginatedList<T>>;
  getOne: (id: string | number) => Promise<T>;
  create: (data: TCreate) => Promise<T>;
  update: (id: string | number, data: TUpdate) => Promise<T>;
  delete: (id: string | number) => Promise<void>;
}

export const createApiService = <T, TCreate = Partial<T>, TUpdate = Partial<T>>(
  client: AxiosInstance,
  endpoint: string
): ApiService<T, TCreate, TUpdate> => ({
  getAll: async (params) => {
    const { data } = await client.get<T[]>(endpoint, { params });
    return data;
  },

  getPaginated: async (params) => {
    const { data } = await client.get<PaginatedList<T>>(endpoint, {
      params,
    });
    return data;
  },

  getOne: async (id) => {
    const { data } = await client.get<T>(`${endpoint}/${id}`);
    return data;
  },

  create: async (payload) => {
    const { data } = await client.post<T>(endpoint, payload);
    return data;
  },

  update: async (id, payload) => {
    const { data } = await client.put<T>(`${endpoint}/${id}`, payload);
    return data;
  },

  delete: async (id) => {
    await client.delete(`${endpoint}/${id}`);
  },
});

export const createQueryKeys = <T extends string>(resource: T) => ({
  all: [resource] as const,
  lists: () => [resource, 'list'] as const,
  list: (params?: Record<string, any>) =>
    [resource, 'list', params].filter(Boolean) as QueryKey,
  details: () => [resource, 'detail'] as const,
  detail: (id: string | number) => [resource, 'detail', id] as const,
  // For custom nested endpoints
  custom: (key: string, params?: Record<string, any>) =>
    [resource, key, params].filter(Boolean) as QueryKey,
});

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export const createQueryHooks = <T, TCreate = Partial<T>, TUpdate = Partial<T>>(
  queryKeys: ReturnType<typeof createQueryKeys>,
  apiService: ApiService<T, TCreate, TUpdate>
) => {
  // GET ALL (non-paginated)
  const useList = (
    params?: Record<string, any>,
    options?: Omit<UseQueryOptions<T[]>, 'queryKey' | 'queryFn'>
  ) => {
    return useQuery({
      queryKey: queryKeys.list(params),
      queryFn: () => apiService.getAll(params),
      ...options,
    });
  };

  // GET PAGINATED
  const usePaginatedList = (
    params?: PaginationParams & Record<string, any>,
    options?: Omit<UseQueryOptions<PaginatedList<T>>, 'queryKey' | 'queryFn'>
  ) => {
    return useQuery({
      queryKey: queryKeys.list(params),
      queryFn: () => apiService.getPaginated(params),
      ...options,
    });
  };

  // GET INFINITE (for infinite scroll)
  const useInfiniteList = (
    params?: Record<string, any>,
    options?: Omit<
      UseInfiniteQueryOptions<PaginatedList<T>>,
      'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >
  ) => {
    return useInfiniteQuery({
      queryKey: queryKeys.list(params),
      queryFn: ({ pageParam = 1 }) =>
        apiService.getPaginated({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.pageNumber + 1 : undefined;
      },
      ...options,
    });
  };

  // GET ONE
  const useDetail = (
    id: string | number,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
  ) => {
    return useQuery({
      queryKey: queryKeys.detail(id),
      queryFn: () => apiService.getOne(id),
      enabled: !!id,
      ...options,
    });
  };

  // CREATE
  const useCreate = (
    options?: Omit<UseMutationOptions<T, Error, TCreate>, 'mutationFn'>
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: apiService.create,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        options?.onSuccess?.(data, variables, context);
      },
      ...options,
    });
  };

  // UPDATE
  const useUpdate = (
    options?: Omit<
      UseMutationOptions<T, Error, { id: string | number; data: TUpdate }>,
      'mutationFn'
    >
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }) => apiService.update(id, data),
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.detail(variables.id),
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        options?.onSuccess?.(data, variables, context);
      },
      ...options,
    });
  };

  // DELETE
  const useDelete = (
    options?: Omit<
      UseMutationOptions<void, Error, string | number>,
      'mutationFn'
    >
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: apiService.delete,
      onSuccess: (data, id, context) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
        queryClient.removeQueries({ queryKey: queryKeys.detail(id) });
        options?.onSuccess?.(data, id, context);
      },
      ...options,
    });
  };

  return {
    useList,
    usePaginatedList,
    useInfiniteList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
  };
};

export const createResource = <T, TCreate = Partial<T>, TUpdate = Partial<T>>(
  client: AxiosInstance,
  resourceName: string,
  endpoint: string
) => {
  const apiService = createApiService<T, TCreate, TUpdate>(client, endpoint);
  const queryKeys = createQueryKeys(resourceName);
  const hooks = createQueryHooks(queryKeys, apiService);

  return {
    api: apiService,
    keys: queryKeys,
    ...hooks,
  };
};