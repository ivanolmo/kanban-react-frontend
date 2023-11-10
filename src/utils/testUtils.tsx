import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider as StoreProvider } from "react-redux";

import type { AppStore, RootState } from "~/store";
import { setupStore } from "~/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  }
  return {
    store,
    dispatch: mockDispatch,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from "@testing-library/react";
