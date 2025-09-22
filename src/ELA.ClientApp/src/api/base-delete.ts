import { WarehouseClient } from "./warehouse-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-axios-error";

type DeleteBody = {
    id: string;
    queryParams?: Record<string, string | undefined>
}

export function createDelete(name: string, route: string) {
    const del = async (body: DeleteBody): Promise<void> => {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(body.queryParams ?? {}).filter(([, v]) => typeof v === "string" && v)
        );
        const response = await WarehouseClient.delete(route.replace(":id", body.id), { params: filteredQueryParams });
        if (response.status === 204) {
            return;
        }
        throw new Error(`Failed to delete ${name}`);
    }

    const useDelete = () => {
        const defaultErrorHandler = (error: unknown) => {
            toast.error(`Error deleting ${name}`, {
                description: getErrorMessage(error),
                duration: 5000,
            });
        }

        const deleteMutation = useMutation<void, unknown, DeleteBody>({
            mutationKey: [`delete-${name}`],
            mutationFn: del,
            onError: defaultErrorHandler
        })

        return { deleteMutation }
    }

    return { useDelete }
}