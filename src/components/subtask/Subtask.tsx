import { useState } from "react";
import clsx from "clsx";
import { Subtask } from "~/types";
import CheckIcon from "../svg/CheckIcon";

type SubtaskItemProps = {
  key: string;
  subtask: Subtask;
  updateCount: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Subtask = (props: SubtaskItemProps): JSX.Element => {
  const [completed, setCompleted] = useState(props.subtask?.completed);

  // const { mutate, error, isLoading } = trpc.useMutation(
  //   ["tasks.complete-subtask"],
  //   {
  //     onSuccess: () => {
  //       // TODO maybe just invalidate the column?
  //       trpcCtx.invalidateQueries(["boards.get-boards"]);
  //       setCompleted(true);
  //     },
  //   },
  // );

  // const handleClick = () => {
  //   if (!completed) {
  //     props.updateCount((prev) => (prev as number) + 1);
  //     mutate({
  //       taskId: store.selectedTask?.id as string,
  //       subtaskId: props.subtask.id,
  //     });
  //   } else {
  //     // do nothing
  //   }
  // };

  return (
    <li
      className="flex cursor-pointer items-center gap-4 rounded-md bg-violet-50 py-4 pl-3 pr-6 hover:bg-violet-700/25 dark:bg-zinc dark:hover:bg-violet-700/25"
      // onClick={() => handleClick()}
    >
      {completed ? (
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm bg-violet-700">
          <CheckIcon className="stroke-white" />
        </div>
      ) : (
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-slate/25 bg-white dark:bg-gunmetal-800" />
      )}

      <span
        className={clsx(
          "text-body-md",
          completed
            ? "text-slate line-through dark:text-white/50"
            : "text-black dark:text-white",
        )}
      >
        {props.subtask?.title}
      </span>
    </li>
  );
};

export default Subtask;
