/**
 * Interfaz que representa los datos de paginación de una determinada consulta a la BD
 */
export interface IPagination {
    totalData: number;
    limit: number;
    totalPages: number;
    page?: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
}

/**
 * Interfaz para una Respuesta del servidor a una determinada Petición
 *
 * @property status HTTP Status Code
 * @property data Datos que serán enviados al cliente
 * @property message Mensaje como respuesta a la petición
 */
export interface APIResponse<I> {
    status: number;
    data?: I;
    message: string | Array<string>;
    pagination?: IPagination;
}
