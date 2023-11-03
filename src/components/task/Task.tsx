import { type Task } from "~/types";

type TaskProps = {
  task: Task;
};

export default function Task(props: TaskProps): JSX.Element {
  const completedSubtasks = props.task.subtasks.filter(
    (subtask) => subtask.completed === true,
  ).length;

  const handleSelect = () => {
    console.log("task item handleSelect");
  };

  return (
    <li
      className="flex flex-col gap-2 px-6 py-4 transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gunmetal-800 hover:scale-105 dark:shadow-xl"
      onClick={() => handleSelect()}
    >
      <h3>{props.task?.title}</h3>
      <span className="text-slate text-body-md">
        {props.task?.subtasks?.length > 0
          ? `${completedSubtasks} of ${props.task?.subtasks?.length} subtasks`
          : "No subtasks"}
      </span>
    </li>
  );
}
