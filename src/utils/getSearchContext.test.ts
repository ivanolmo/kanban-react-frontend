import { getSearchContext } from "~/utils/getSearchContext";
import { createTestBoard } from "~/utils/testUtils";

describe("getSearchContext", () => {
  const testBoard = createTestBoard("1");
  const testColumn = testBoard.columns[0]!;
  const testTask = testColumn.tasks[0]!;
  const testSubtask = testTask.subtasks[0]!;

  test("should return correct context for Board", () => {
    const result = getSearchContext(
      { type: "Board", item: testBoard, board: testBoard },
      "Test Board Name",
    );
    expect(result).toEqual({
      location: "Board: Test Board Name",
      preview: "Test Board Name",
    });
  });

  test("should return correct context for Column", () => {
    const result = getSearchContext(
      { type: "Column", item: testColumn, board: testBoard },
      "Test Column Name",
    );
    expect(result).toEqual({
      location: "Column: Test Column Name",
      preview: "Test Column Name",
    });
  });

  test("should return correct context for Task", () => {
    const result = getSearchContext(
      { type: "Task", item: testTask, board: testBoard },
      "Test Task Title",
    );
    expect(result).toEqual({
      location: "Task: 'Test Task Title'",
      preview: "Test Task Description...",
    });
  });

  test("should return correct context for Subtask", () => {
    const result = getSearchContext(
      { type: "Subtask", item: testSubtask, board: testBoard },
      "Test Subtask Title",
    );
    expect(result).toEqual({
      location: "Subtask: 'Test Subtask Title'",
      preview: "Test Subtask Title",
    });
  });
});
