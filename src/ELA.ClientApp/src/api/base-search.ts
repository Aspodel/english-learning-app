import { useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/lib/get-axios-error";
import { api } from "@/lib/api-client";

type SearchBody = {
    queryParams?: Record<string, string | undefined>;
}

export function createSearch<T>(name: string, route: string) {
    const search = async (body: SearchBody): Promise<PaginatedList<T>> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        
        const response = await api.get(route, { params: filteredQueryParams });
        if (response.status === 200) return response.data;
        throw new Error(`Failed to search ${name}`);
    }
    const useSearch = (body: SearchBody) => {
        const { data, isLoading, refetch, error, isError } = useQuery<PaginatedList<T>, Error>({
            queryKey: [`search-${name}`, body.queryParams],
            queryFn: () => search(body),
        });
        useEffect(() => {
            if (isError) {
                console.log(error);
                toast.error(`Error searching ${name}`, {
                    description: getErrorMessage(error),
                    duration: 5000,
                });
            }
        }, [isError, error]);

        const emptyResult: PaginatedList<T> = {
            items: [],
            pageNumber: 1,
            totalPages: 1,
            totalCount: 0,
            hasPreviousPage: false,
            hasNextPage: false,
        };

        return { data: data ?? emptyResult, isLoading, refetch };
    }

    return { useSearch };
}