import { transformData } from "~/utils/transformDataForReport";
import { createTestBoard } from "~/utils/testUtils";

describe("transformData", () => {
  const testBoard = createTestBoard("1");
  const testColumn = testBoard.columns[0]!;
  const testTask = testColumn.tasks[0]!;
  const testSubtask = testTask.subtasks[0]!;

  test("should return correct data for selected board", () => {
    const result = transformData([testBoard], "1");
    expect(result).toEqual([
      {
        columnName: testColumn.name,
        taskTitle: testTask.title,
        taskDescription: testTask.description,
        subtaskTitle: testSubtask.title,
        subtaskCompleted: testSubtask.completed,
        subtaskUpdatedAt: new Date(testSubtask.updatedAt),
      },
    ]);
  });

  test("should return empty array for non-existing board", () => {
    const result = transformData([testBoard], "2");
    expect(result).toEqual([]);
  });

  test("should return empty array for empty boards array", () => {
    const result = transformData([], "1");
    expect(result).toEqual([]);
  });
});
