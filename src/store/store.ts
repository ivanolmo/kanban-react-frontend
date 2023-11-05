import { configureStore } from "@reduxjs/toolkit";

import { api } from "~/store/api";
import boardReducer from "~/store/boardSlice";
import uiReducer from "~/store/uiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    board: boardReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
