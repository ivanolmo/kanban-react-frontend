import {
  combineReducers,
  configureStore,
  type PreloadedState,
} from "@reduxjs/toolkit";

import { api } from "~/store/api";
import boardReducer from "~/store/boardSlice";
import uiReducer from "~/store/uiSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  board: boardReducer,
  ui: uiReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
