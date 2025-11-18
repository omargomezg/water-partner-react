import {createApi} from '@reduxjs/toolkit/query/react';
import {Tariff, Tariffs} from '../types';
import {authorizedBaseQuery} from "./common";


export const tariffApi = createApi({
    reducerPath: 'tariffApi',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Tariff', 'Tariffs'],
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
            query: ({id, ...updatedTariff}) => ({
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