import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { api } from "~/store/api";
import type { ApiErrorResponse, Board, Task } from "~/types";

type BoardState = {
  boards: Array<Board>;
  error: ApiErrorResponse | null;
  currentBoard: Board | null;
  currentTask: Task | null;
};

const initialState: BoardState = {
  boards: [],
  error: null as ApiErrorResponse | null,
  currentBoard: null,
  currentTask: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<Array<Board>>) {
      state.boards = action.payload;
    },
    setCurrentBoard(state, action: PayloadAction<Board>) {
      state.currentBoard = action.payload;
    },
    clearCurrentBoard(state) {
      state.currentBoard = null;
    },
    setCurrentTask(state, action: PayloadAction<Task>) {
      state.currentTask = action.payload;
    },
    clearCurrentTask(state) {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getBoards.matchFulfilled,
      (state, action) => {
        state.boards = action.payload;
      },
    );
    builder.addMatcher(
      api.endpoints.createBoard.matchFulfilled,
      (state, action) => {
        state.currentBoard = action.payload;
      },
    );
    builder.addMatcher(
      api.endpoints.editBoard.matchFulfilled,
      (state, action) => {
        state.currentBoard = action.payload;
      },
    );
    builder.addMatcher(api.endpoints.deleteBoard.matchFulfilled, (state, _) => {
      // if no boards are left, set currentBoard to null
      if (state.boards.length === 0) {
        state.currentBoard = null;
        return;
      }

      // if boards remain, get the current board index
      const nextBoardIndex = state.boards.findIndex(
        (board) => board.id === state.currentBoard?.id,
      );

      // set the current board to the next board in the array, or the first if at the end of the list
      const nextBoard =
        nextBoardIndex >= 0
          ? state.boards[nextBoardIndex + 1] ?? state.boards[0]
          : state.boards[state.boards.length - 1];

      // make sure the current board is not undefined
      state.currentBoard = nextBoard ?? null;
    });
    builder.addMatcher(
      api.endpoints.addTask.matchFulfilled,
      (state, action) => {
        const task = action.payload;

        // update boards array
        state.boards = state.boards.map((board) => {
          // if the task's column is in the board, add the task to the column
          if (board.columns.some((column) => column.id === task.columnId)) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.id === task.columnId) {
                  return {
                    ...column,
                    tasks: [...column.tasks, task],
                  };
                }
                return column;
              }),
            };
          }
          return board;
        });

        // update currentBoard for a ui update
        if (state.currentBoard) {
          // if the task's column is in the currentBoard, add the task to the column
          if (
            state.currentBoard.columns.some(
              (column) => column.id === task.columnId,
            )
          ) {
            state.currentBoard = {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) => {
                if (column.id === task.columnId) {
                  return {
                    ...column,
                    tasks: [...column.tasks, task],
                  };
                }
                return column;
              }),
            };
          }
        }
      },
    );
    builder.addMatcher(
      api.endpoints.editTask.matchFulfilled,
      (state, action) => {
        const updatedTask = action.payload;

        // update boards array
        state.boards = state.boards.map((board) => {
          return {
            ...board,
            columns: board.columns.map((column) => {
              // remove the task from its old column
              let tasks = column.tasks.filter(
                (task) => task.id !== updatedTask.id,
              );

              // add the task to the new column
              if (column.id === updatedTask.columnId) {
                tasks = [...tasks, updatedTask];
              }

              return { ...column, tasks };
            }),
          };
        });

        // update currentBoard for a ui update
        if (state.currentBoard) {
          state.currentBoard = {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map((column) => {
              let tasks = column.tasks.filter(
                (task) => task.id !== updatedTask.id,
              );

              if (column.id === updatedTask.columnId) {
                tasks = [...tasks, updatedTask];
              }

              return { ...column, tasks };
            }),
          };
        }
      },
    );
    builder.addMatcher(
      api.endpoints.deleteTask.matchFulfilled,
      (state, action) => {
        const taskId = action.meta.arg.originalArgs;

        // update boards array
        state.boards = state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          })),
        }));

        // update currentBoard
        if (state.currentBoard) {
          state.currentBoard = {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map((column) => ({
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            })),
          };
        }
      },
    );
  },
});

export const {
  setBoards,
  setCurrentBoard,
  clearCurrentBoard,
  setCurrentTask,
  clearCurrentTask,
} = boardSlice.actions;

export default boardSlice.reducer;
