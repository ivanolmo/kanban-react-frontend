import clsx from "clsx";

import CheckIcon from "~/components/svg/CheckIcon";
import { useToggleSubtaskMutation } from "~/store/api";
import { Subtask } from "~/types";

type SubtaskItemProps = {
  subtask: Subtask;
};

const Subtask = ({ subtask }: SubtaskItemProps): JSX.Element => {
  const [toggleSubtask, { isLoading, error, data }] =
    useToggleSubtaskMutation();

  const handleToggle = async () => {
    try {
      await toggleSubtask(subtask.id).unwrap();
    } catch (err) {
      console.log("err -> ", err);
    }
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Updating subtask...</p>;

  return (
    <li
      className="flex cursor-pointer items-center gap-4 rounded-md bg-violet-50 py-4 pl-3 pr-6 hover:bg-violet-700/25 dark:bg-zinc dark:hover:bg-violet-700/25"
      onClick={() => handleToggle()}
    >
      {subtask.completed ? (
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm bg-violet-700">
          <CheckIcon className="stroke-white" />
        </div>
      ) : (
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-slate/25 bg-white dark:bg-gunmetal-800" />
      )}

      <span
        className={clsx(
          "text-body-md",
          subtask.completed
            ? "text-slate line-through dark:text-white/50"
            : "text-black dark:text-white",
        )}
      >
        {subtask.title}
      </span>
    </li>
  );
};

export default Subtask;
