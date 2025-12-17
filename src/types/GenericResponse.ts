export class GenericResponse<T> {
    message: string = "";
    success: boolean = false;
    content: T = {} as T;
}
