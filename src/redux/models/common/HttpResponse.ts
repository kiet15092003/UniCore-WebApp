export interface HttpResponse<TData> {
    data: {
        succeeded: boolean;
        result?: TData;
        errors: Array<string>;
    };
    status: number;
    statusText: string;
    ok: boolean;
}
