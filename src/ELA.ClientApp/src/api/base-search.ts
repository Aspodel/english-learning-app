import { useEffect } from "react";
import { WarehouseClient } from "./warehouse-client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/get-axios-error";

type SearchBody = {
    queryParams?: Record<string, string | undefined>;
}

export function createSearch<T>(name: string, route: string) {
    const search = async (body: SearchBody): Promise<T[]> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        const response = await WarehouseClient.get(route, { params: filteredQueryParams });
        if (response.status === 200) return response.data;
        throw new Error(`Failed to search ${name}`);
    }
    const useSearch = (body: SearchBody) => {
        const { data, isLoading, refetch, error, isError } = useQuery<T[], Error>({
            queryKey: [`search-${name}`, body.queryParams],
            queryFn: () => search(body),
        });
        useEffect(() => {
            if (isError) {
                toast.error(`Error searching ${name}`, {
                    description: getErrorMessage(error),
                    duration: 5000,
                });
            }
        }, [isError, error]);

        return { data: data ?? [], isLoading, refetch };
    }

    return { useSearch };
}