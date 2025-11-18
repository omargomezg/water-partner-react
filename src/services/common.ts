import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

export const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1'
});

export const authorizedBaseQuery: BaseQueryFn<
    any, // Lo que acepta como argumento => string | FetchArgs
    unknown,            // El tipo de resultado de la consulta (data)
    FetchBaseQueryError // El tipo de error
> = async (args, api, extraOptions) => {
    let request = args;
    if (typeof args === 'string') {
        request = {url: args};
    }
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDA4MTIyNjksbnVsbCIsImlzcyI6ImNvbS5oYXJkbmV0cyIsImlhdCI6MTc2Mjk3OTc5NCwiZXhwIjoxNzYzNTg0NTk0fQ.V4nPTibsWj_t7ouikJAZ0JsDxqF2ybghO5rDKEs49H35zD_u8MKZK2K7TA5mMvhGKcPqUixEGaZQBat6dVDqSg";

    if (token) {
        request = {
            ...request,
            headers: {
                ...(request as FetchArgs).headers,
                Authorization: `Bearer ${token}`,
            },
        };
    }

    const result = await rawBaseQuery(request, api, extraOptions);
    if (result.error && result.error.status === 401) {
        console.error("Token no válido o expirado. Redirigiendo a Login...");
        alert("Token no válido o expirado. Por favor, inicie sesión nuevamente.");
    }

    return result;
};