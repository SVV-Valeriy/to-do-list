import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "./slice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        task: taskReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>