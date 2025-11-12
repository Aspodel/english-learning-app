import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface CrudConfig<
  TData,
  TVars = Partial<TData>,
  TListParams extends Record<string, any> = Record<string, any>,
> {
  resource: string;
  baseUrl?: string | ((params: TListParams) => string);
  idKey?: keyof TData;
}

export function createCrudApi<
  TData extends Record<string, any>,
  TVars = Partial<TData>,
  TListParams extends Record<string, any> = Record<string, any>,
>({
  resource,
  baseUrl = `/${resource}`,
  idKey = 'id' as keyof TData,
}: CrudConfig<TData, TVars, TListParams>) {
  const keys = {
    all: [resource] as const,
    list: (params?: TListParams) =>
      [resource, 'list', params].filter(Boolean) as QueryKey,
    detail: (id: string | number, parentParams?: any) =>
      [resource, 'detail', id, parentParams].filter(Boolean) as QueryKey,
  };

  const resolveBase = (params?: TListParams) =>
    typeof baseUrl === 'function'
      ? baseUrl(params ?? ({} as TListParams))
      : baseUrl;

  // --- Core CRUD ---
  const useList = <T = TData[]>(
    params?: TListParams,
    options?: UseQueryOptions<T>
  ) =>
    useQuery<T>({
      queryKey: keys.list(params),
      queryFn: async () => {
        const res = await apiClient.get(resolveBase(params), { params });
        return res.data;
      },
      ...options,
    });

  const useDetail = <T = TData>(
    id: string | number,
    params?: TListParams,
    options?: UseQueryOptions<T>
  ) =>
    useQuery<T>({
      queryKey: keys.detail(id, params),
      queryFn: async () => {
        const res = await apiClient.get(`${resolveBase(params)}/${id}`, {
          params,
        });
        return res.data;
      },
      enabled: !!id,
      ...options,
    });

  const useCreate = <T = TData>(
    options?: UseMutationOptions<T, unknown, TVars & TListParams>
  ) =>
    useMutation<T, unknown, TVars & TListParams>({
      mutationFn: (vars) => apiClient.post(resolveBase(vars as any), vars.data),
      ...options,
    });

  const useUpdate = <T = void>(
    options?: UseMutationOptions<T, unknown, TVars & TListParams>
  ) =>
    useMutation<T, unknown, TVars & TListParams>({
      mutationFn: (vars: any) =>
        apiClient.put(`${resolveBase(vars)}/${vars[idKey]}`, vars),
      ...options,
    });

  const useDelete = <T = void>(
    options?: UseMutationOptions<
      T,
      unknown,
      { id: string | number } & TListParams
    >
  ) =>
    useMutation<T, unknown, { id: string | number } & TListParams>({
      mutationFn: ({ id, ...params }) =>
        apiClient.delete(`${resolveBase(params as any)}/${id}`),
      ...options,
    });

  // --- Helpers for custom endpoints ---
  const customQuery = <R = any>({
    url,
    key,
    options,
  }: {
    url: string | ((params: any) => string);
    key: QueryKey;
    options?: UseQueryOptions<R>;
  }) =>
    useQuery<R>({
      queryKey: key,
      queryFn: () => apiClient.get(typeof url === 'function' ? url({}) : url),
      ...options,
    });

  const customMutation = <TBody = any, R = any>({
    url,
    method = 'post',
    options,
  }: {
    url: string | ((body: TBody) => string);
    method?: 'post' | 'put' | 'patch' | 'delete';
    options?: UseMutationOptions<R, unknown, TBody>;
  }) =>
    useMutation<R, unknown, TBody>({
      mutationFn: (body) =>
        apiClient[method](
          typeof url === 'function' ? url(body) : url,
          body as any
        ),
      ...options,
    });

  const extend = <TExtra extends Record<string, any>>(
    builder: (base: {
      customQuery: typeof customQuery;
      customMutation: typeof customMutation;
    }) => TExtra
  ) => {
    const extra = builder({ customQuery, customMutation });
    return { ...api, ...extra };
  };

  const api = {
    keys,
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
    extend,
    customQuery,
    customMutation,
  };

  return api;
}
