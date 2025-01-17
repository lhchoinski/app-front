export interface IPaginationSimpleRequest {
    pageNo: number;
    pageSize: number;
    search?: string | null;
    status?: boolean | null;
}

export interface IPaginationResponse<T> {
    currentPage: number;
    data: T[];
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
