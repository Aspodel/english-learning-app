import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { getErrorMessage } from '@/lib/get-axios-error';

type DeleteBody = {
  id: string;
  queryParams?: Record<string, string | undefined>;
};

export function createDelete(name: string, route: string) {
  const del = async (body: DeleteBody): Promise<void> => {
    const filteredQueryParams = Object.fromEntries(
      Object.entries(body.queryParams ?? {}).filter(
        ([, v]) => typeof v === 'string' && v
      )
    );
    const response = await api.delete(route.replace(':id', body.id), {
      params: filteredQueryParams,
    });
    if (response.status === 204) {
      return;
    }
    throw new Error(`Failed to delete ${name}`);
  };

  const useDelete = () => {
    const queryClient = useQueryClient();

    const defaultErrorHandler = (error: unknown) => {
      toast.error(`Error deleting ${name}`, {
        description: getErrorMessage(error),
        duration: 5000,
      });
    };

    const deleteMutation = useMutation<void, unknown, DeleteBody>({
      mutationKey: [`delete-${name}`],
      mutationFn: del,
      onError: defaultErrorHandler,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`search-${name}`] });
      },
    });

    return { deleteMutation };
  };

  return { useDelete };
}
