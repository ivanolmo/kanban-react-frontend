import type { Board, SearchResult } from "~/types";

export const searchBoards = (
  boards: Board[],
  query: string,
): SearchResult[] => {
  const lowerCaseQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  boards.forEach((board) => {
    if (board.name.toLowerCase().includes(lowerCaseQuery)) {
      results.push({ type: "Board", item: board, board });
    }

    board.columns.forEach((column) => {
      if (column.name.toLowerCase().includes(lowerCaseQuery)) {
        results.push({ type: "Column", item: column, board });
      }

      column.tasks.forEach((task) => {
        if (
          task.title.toLowerCase().includes(lowerCaseQuery) ||
          task.description.toLowerCase().includes(lowerCaseQuery)
        ) {
          results.push({ type: "Task", item: task, board });
        }

        task.subtasks.forEach((subtask) => {
          if (subtask.title.toLowerCase().includes(lowerCaseQuery)) {
            results.push({ type: "Subtask", item: subtask, board });
          }
        });
      });
    });
  });

  return results;
};
