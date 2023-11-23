import { useDispatch } from "react-redux";
import { setCurrentTask } from "~/store/boardSlice";
import { toggleViewTaskModal } from "~/store/uiSlice";
import { Task } from "~/types";

type TaskProps = {
  task: Task;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed === true,
  ).length;

  const handleSelect = () => {
    dispatch(toggleViewTaskModal());
    dispatch(setCurrentTask(task));
  };

  return (
    <li
      className="flex cursor-pointer flex-col gap-2 rounded-lg bg-white px-6 py-4 shadow-md transition-all duration-0 hover:scale-105 dark:bg-gunmetal-800 dark:shadow-xl"
      onClick={() => handleSelect()}
      data-testid="task"
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
