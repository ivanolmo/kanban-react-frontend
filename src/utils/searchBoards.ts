import type { Board } from "~/types";

export const searchBoards = (boards: Board[], query: string): Board[] => {
  const lowerCaseQuery = query.toLowerCase();

  const results = boards.filter(
    (board) =>
      board.name.toLowerCase().includes(lowerCaseQuery) ||
      board.columns.some(
        (column) =>
          column.name.toLowerCase().includes(lowerCaseQuery) ||
          column.tasks.some(
            (task) =>
              task.title.toLowerCase().includes(lowerCaseQuery) ||
              task.description.toLowerCase().includes(lowerCaseQuery) ||
              task.subtasks.some((subtask) =>
                subtask.title.toLowerCase().includes(lowerCaseQuery),
              ),
          ),
      ),
  );

  return results;
};
