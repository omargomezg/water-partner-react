/**
 * @interface PageResponse<T>
 * Representa una estructura de respuesta paginada de una API REST.
 * T es el tipo de datos de los elementos contenidos en la página (ej. User, Product).
 */
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
        sort: Sort;
    };
    size: number;
    sort: Sort;
    totalPages: number;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;

}