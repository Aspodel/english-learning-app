import { api } from "@/lib/api-client";
import { getErrorMessage } from "@/lib/get-axios-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type PutBody<T> = {
    data: T;
    queryParams?: Record<string, string | undefined>;
}

type PutResponse = {
    id: string;
}

export function createPut<T>(name: string, route: string) {

    const update = async (body: PutBody<T>): Promise<PutResponse> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        const response = await api.put(route, body.data, { params: filteredQueryParams });
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(`Failed to update ${name}`);
    }

    const useUpdate = () => {
        const defaultErrorHandler = (error: unknown) => {
            toast.error(`Error updating ${name}`, {
                description: getErrorMessage(error),
                duration: 5000,
            });
        }

        const updateMutation = useMutation<PutResponse, unknown, PutBody<T>>({
            mutationKey: [`put-${name}`],
            mutationFn: update,
            onError: defaultErrorHandler
        })

        return { updateMutation }
    }

    return { useUpdate }
}