import { apiClient } from '@/lib/api-client';
import { getErrorMessage } from '@/lib/get-axios-error';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type PutBody<T> = {
  data: T;
  queryParams?: Record<string, string | undefined>;
};

type PutResponse = {
  id: string;
};

export function createPut<T extends { id: string | number }>(name: string, route: string) {
  const update = async (body: PutBody<T>): Promise<PutResponse> => {
    const filteredQueryParams = Object.fromEntries(
      Object.entries(body.queryParams ?? {}).filter(
        ([, v]) => typeof v === 'string' && v
      )
    );
    const response = await apiClient.put(
      route.replace(':id', String(body.data.id)),
      body.data,
      { params: filteredQueryParams }
    );
    if (response.status === 204) {
      return response.data;
    }
    throw new Error(`Failed to update ${name}`);
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();

    const defaultErrorHandler = (error: unknown) => {
      toast.error(`Error updating ${name}`, {
        description: getErrorMessage(error),
        duration: 5000,
      });
    };

    const updateMutation = useMutation<PutResponse, unknown, PutBody<T>>({
      mutationKey: [`put-${name}`],
      mutationFn: update,
      onError: defaultErrorHandler,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`search-${name}`] });
        queryClient.invalidateQueries({ queryKey: [`get-${name}`] });
      },
    });

    return { updateMutation };
  };

  return { useUpdate };
}
