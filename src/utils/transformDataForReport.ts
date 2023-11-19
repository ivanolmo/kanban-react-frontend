import type { Board } from "~/types";

export const transformData = (boards: Board[], selectedBoardId: string) => {
  return boards
    ?.filter((board) => board.id === selectedBoardId)
    .flatMap((board) => {
      return board.columns.flatMap((column) => {
        return column.tasks.flatMap((task) => {
          return task.subtasks.map((subtask) => {
            return {
              columnName: column.name,
              taskTitle: task.title,
              taskDescription: task.description,
              subtaskTitle: subtask.title,
              subtaskCompleted: subtask.completed,
              subtaskUpdatedAt: new Date(subtask.updatedAt),
            };
          });
        });
      });
    });
};

export type TransformedData = ReturnType<typeof transformData>;
