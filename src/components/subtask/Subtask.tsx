import clsx from "clsx";
import { useEffect } from "react";

import CheckIcon from "~/components/svg/CheckIcon";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useToggleSubtaskMutation } from "~/store/api";
import { Subtask } from "~/types";

type SubtaskItemProps = {
  subtask: Subtask;
};

const Subtask: React.FC<SubtaskItemProps> = ({ subtask }) => {
  const [toggleSubtask, { isLoading, error }] = useToggleSubtaskMutation();

  const handleError = useHandleError();

  const handleToggle = async () => {
    await toggleSubtask(subtask.id).unwrap();
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

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
        {isLoading ? <Loader color="#635fc7" size={6} /> : subtask.title}
      </span>
    </li>
  );
};

export default Subtask;
