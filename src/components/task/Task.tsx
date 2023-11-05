import React from "react";
import { Task } from "~/types";

type TaskProps = {
  task: Task;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed === true,
  ).length;

  const handleSelect = () => {
    console.log("task item handleSelect");
  };

  return (
    <li
      className="flex flex-col gap-2 px-6 py-4 transition-all bg-white rounded-lg shadow-md cursor-pointer duration-0 hover:scale-105 dark:bg-gunmetal-800 dark:shadow-xl"
      onClick={() => handleSelect()}
    >
      <h3>{task?.title}</h3>
      <span className="text-body-md text-slate">
        {task?.subtasks?.length > 0
          ? `${completedSubtasks} of ${task?.subtasks?.length} subtasks`
          : "No subtasks"}
      </span>
    </li>
  );
};

export default Task;
