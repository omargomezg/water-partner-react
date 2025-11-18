import { configureStore } from "@reduxjs/toolkit";
import { tariffApi } from "../services/tariffApi";
import {authApi} from "../services/authApi";

export const store = configureStore({
    reducer: {
        [tariffApi.reducerPath]: tariffApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tariffApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;