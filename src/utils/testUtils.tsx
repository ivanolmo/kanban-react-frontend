import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider as StoreProvider } from "react-redux";

import type { AppStore, RootState } from "~/store";
import { setupStore } from "~/store";
import type { Board, Column, Task, Subtask } from "~/types";

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

// simple wrapper for testing hooks
export function renderHookWithMockDispatch() {
  const store = setupStore();
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  };

  return { store, mockDispatch, Wrapper };
}

// factory functions for creating test data
export const createTestBoard = (id: string): Board => {
  return {
    id,
    name: "Test Board Name",
    columns: [createTestColumn("1")],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
  };
};

export const createTestColumn = (id: string): Column => {
  return {
    id,
    name: "Test Column Name",
    color: "#ff0000",
    tasks: [createTestTask("1")],
    createdAt: new Date(),
    updatedAt: new Date(),
    boardId: "1",
  };
};

export const createTestTask = (id: string): Task => {
  return {
    id,
    title: "Test Task Title",
    description: "Test Task Description",
    createdAt: new Date(),
    updatedAt: new Date(),
    columnId: "1",
    subtasks: [createTestSubtask("1")],
  };
};

export const createTestSubtask = (id: string): Subtask => {
  return {
    id,
    title: "Test Subtask Title",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    taskId: "1",
  };
};

export * from "@testing-library/react";
