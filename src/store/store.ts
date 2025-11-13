import { configureStore } from "@reduxjs/toolkit";
import { tariffApi } from "../services/tariffApi";

export const store = configureStore({
    reducer: {
        [tariffApi.reducerPath]: tariffApi.reducer,        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tariffApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;