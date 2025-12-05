/**
 * @interface PageResponse<T>
 * Representa una estructura de respuesta paginada de una API REST.
 * T es el tipo de datos de los elementos contenidos en la página (ej. User, Product).
 */
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
}
