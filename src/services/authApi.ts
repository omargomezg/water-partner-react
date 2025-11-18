import {createApi} from "@reduxjs/toolkit/query/react";
import {authorizedBaseQuery} from "./common";
import {Auth} from "../types";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: authorizedBaseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<Auth, Auth>({
            query: (credentials) => ({
                url: '/public/auth/signup',
                method: 'POST',
                body: credentials
            }),
        })
    })
})

export const {
    useLoginMutation
} = authApi;