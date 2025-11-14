import { useEffect } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/get-axios-error";
import { apiClient } from "@/lib/api-client";

type GetBody = {
    id: string | number;
    queryParams?: Record<string, string | undefined>;
    enable?: boolean;
}

export function createGet<T>(name: string, route: string) {
    const getById = async (body: GetBody): Promise<T> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        const response = await apiClient.get(route.replace(":id", String(body.id)), { params: filteredQueryParams });
        if (response.status === 200) return response.data;
        throw new Error(`Failed to get ${name}`);
    };

    const useGet = (body: GetBody) => {
        const { data, isLoading, refetch, error, isError } = useQuery<T, Error>({
            queryKey: [`get-${name}`, body.id, body.queryParams],
            queryFn: () => getById(body),
            enabled: body.enable ?? true,
        });

        useEffect(() => {
            if (isError) {
                toast.error(`Error fetching ${name}`, {
                    description: getErrorMessage(error),
                    duration: 5000,
                });
            }
        }, [isError, error]);

        return { data, isLoading, refetch };
    }

    const useGetMutation = () => {
        const defaultErrorHandler = (error: unknown) => {
            toast.error(`Error fetching ${name}`, {
                description: getErrorMessage(error),
                duration: 5000,
            });
        }

        const getMutation = useMutation<T, unknown, GetBody>({
            mutationKey: [`get-mutation-${name}`],
            mutationFn: getById,
            onError: defaultErrorHandler
        })

        return { getMutation }
    }

    return { useGet, useGetMutation };
}
