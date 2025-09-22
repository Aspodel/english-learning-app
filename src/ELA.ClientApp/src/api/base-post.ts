import { getErrorMessage } from "@/lib/get-axios-error";
import { WarehouseClient } from "./warehouse-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PostBody<T> = {
    data: T;
    queryParams?: Record<string, string | undefined>;
}

type PostResponse = {
    id: string;
}

export function createPost<T>(name: string, route: string) {
    const create = async (body: PostBody<T>): Promise<PostResponse> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        const response = await WarehouseClient.post(route, body.data, { params: filteredQueryParams });
        if (response.status === 201) {
            return response.data;
        }
        throw new Error(`Failed to create ${name}`);
    }

    const useCreate = () => {
        const defaultErrorHandler = (error: unknown) => {
            toast.error(`Error creating ${name}`, {
                description: getErrorMessage(error),
                duration: 5000,
            });
        }

        const createMutation = useMutation<PostResponse, unknown, PostBody<T>>({
            mutationKey: [`post-${name}`],
            mutationFn: create,
            onError: defaultErrorHandler
        })

        return { createMutation }
    }

    return { useCreate }
}