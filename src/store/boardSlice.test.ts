import boardSlice, {
  clearCurrentBoard,
  clearCurrentTask,
  initialBoardState,
  setCurrentBoard,
  setCurrentTask,
} from "~/store/boardSlice";
import { createTestBoard, createTestTask } from "~/utils/testUtils";

describe("boardSlice", () => {
  const testBoard = createTestBoard("1");
  const testTask = createTestTask("1");

  test("should return the initial state", () => {
    expect(boardSlice(undefined, { type: undefined })).toEqual(
      initialBoardState,
    );
  });

  test("should handle setCurrentBoard", () => {
    expect(boardSlice(initialBoardState, setCurrentBoard(testBoard))).toEqual({
      ...initialBoardState,
      currentBoard: testBoard,
    });
  });

  test("should handle setCurrentTask", () => {
    expect(boardSlice(initialBoardState, setCurrentTask(testTask))).toEqual({
      ...initialBoardState,
      currentTask: testTask,
    });
  });

  test("should handle clearCurrentBoard", () => {
    expect(boardSlice(initialBoardState, clearCurrentBoard())).toEqual({
      ...initialBoardState,
      currentBoard: null,
    });
  });

  test("should handle clearCurrentTask", () => {
    expect(boardSlice(initialBoardState, clearCurrentTask())).toEqual({
      ...initialBoardState,
      currentTask: null,
    });
  });
});
