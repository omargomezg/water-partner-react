import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {Tariff, Tariffs} from '../types';
import { create } from 'domain';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1'
});

const authorizedBaseQuery: BaseQueryFn<
    any, // Lo que acepta como argumento => string | FetchArgs
    unknown,            // El tipo de resultado de la consulta (data)
    FetchBaseQueryError // El tipo de error
> = async (args, api, extraOptions) => {
    let request = args;
    if (typeof args === 'string') {
        request = { url: args };
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

export const tariffApi = createApi({
    reducerPath: 'tariffApi',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Tariff'],
    endpoints: (builder) => ({
        getTariffs: builder.query<Tariffs, void>({
            query: () => '/tariff',
            providesTags: ['Tariff'],
        }),
        createTariff: builder.mutation<void, Partial<Tariff>>({
            query: (newTariff) => ({
                url: '/tariff',
                method: 'POST',
                body: newTariff,
            }),
            invalidatesTags: ['Tariff'],
        }),
        updateTariff: builder.mutation<void, Partial<Tariffs> & { id: number }>({
            query: ({ id, ...updatedTariff }) => ({
                url: `/tariff/${id}`,
                method: 'PUT',
                body: updatedTariff,
            }),
            invalidatesTags: ['Tariff'],
        }),
    }),
});

export const {
    useGetTariffsQuery,
    useCreateTariffMutation,
    useUpdateTariffMutation
} = tariffApi;