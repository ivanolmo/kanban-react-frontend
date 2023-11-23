import { searchBoards } from "./searchBoards";
import { createTestBoard } from "./testUtils";

describe("searchBoards", () => {
  const testBoard = createTestBoard("1");
  const testColumn = testBoard.columns[0]!;
  const testTask = testColumn.tasks[0]!;
  const testSubtask = testTask.subtasks[0]!;

  test("should return correct results for Board search", () => {
    const results = searchBoards([testBoard], "Test Board Name");
    expect(results).toEqual([
      { type: "Board", item: testBoard, board: testBoard },
    ]);
  });

  test("should return correct results for Column search", () => {
    const results = searchBoards([testBoard], "Test Column Name");
    expect(results).toEqual([
      { type: "Column", item: testColumn, board: testBoard },
    ]);
  });

  test("should return correct results for Task search", () => {
    const results = searchBoards([testBoard], "Test Task Title");
    expect(results).toEqual([
      { type: "Task", item: testTask, board: testBoard },
    ]);
  });

  test("should return correct results for Subtask search", () => {
    const results = searchBoards([testBoard], "Test Subtask Title");
    expect(results).toEqual([
      { type: "Subtask", item: testSubtask, board: testBoard },
    ]);
  });

  test("should return empty array for no matches", () => {
    const results = searchBoards([testBoard], "No Match");
    expect(results).toEqual([]);
  });

  // partial matches
  test("should return correct results for partial Board search", () => {
    const results = searchBoards([testBoard], "Boa");
    expect(results).toEqual([
      { type: "Board", item: testBoard, board: testBoard },
    ]);
  });

  test("should return correct results for partial Column search", () => {
    const results = searchBoards([testBoard], "Col");
    expect(results).toEqual([
      { type: "Column", item: testColumn, board: testBoard },
    ]);
  });

  test("should return correct results for partial Task search", () => {
    const results = searchBoards([testBoard], "Tas");
    expect(results).toEqual([
      { type: "Task", item: testTask, board: testBoard },
      { type: "Subtask", item: testSubtask, board: testBoard },
    ]);
  });

  test("should return correct results for partial Subtask search", () => {
    const results = searchBoards([testBoard], "Subta");
    expect(results).toEqual([
      { type: "Subtask", item: testSubtask, board: testBoard },
    ]);
  });
});
