import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { api } from "./api";
import { type ApiErrorResponse, type Board, type Task } from "~/types";

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
        state.boards = action.payload.data;
        // set the currentBoard to the first board in the array if any boards are present
        const firstBoard = action.payload.data[1];
        state.currentBoard = firstBoard ? firstBoard : null;
      },
    );
    // builder.addMatcher(
    //   api.endpoints.createBoard.matchFulfilled,
    //   (state, action) => {
    //     if (action.payload.data) {
    //       state.boards.push(action.payload.data);
    //     }
    //   },
    // );
  },
});

export const { setBoards, setCurrentBoard, setCurrentTask } =
  boardSlice.actions;

export default boardSlice.reducer;
