import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import XIcon from "../svg/XIcon";
import Select from "../ui/Select";
import { selectCurrentTask } from "~/store/selectors";
import { toggleEditTaskModal, toggleViewTaskModal } from "~/store/uiSlice";
import { clearCurrentTask } from "~/store/boardSlice";
import ViewTaskMenu from "../task/ViewTaskMenu";
import Subtask from "../subtask/Subtask";

const ViewTask: React.FC = () => {
  const [completedSubtaskCount, setCompletedSubtaskCount] = useState<
    number | undefined
  >(0);
  const dispatch = useDispatch();
  const currentTask = useSelector(selectCurrentTask);

  // const { mutate, error, isLoading } = trpc.useMutation(["tasks.move-task"], {
  //   onSuccess: () => {
  //     // TODO check
  //     trpcCtx.invalidateQueries(["boards.get-boards"]);
  //     store.clearSelectedTask();
  //   },
  // });

  const { control } = useForm({
    defaultValues: {
      columnId: "",
    },
    mode: "onBlur",
  });

  // const handleDelete = () => {
  //   store.toggleViewTaskModal();
  //   store.toggleDeleteTaskModal();
  // };

  // const handleEdit = () => {
  //   store.toggleViewTaskModal();
  //   store.toggleEditTaskModal();
  // };

  const handleClose = () => {
    dispatch(toggleViewTaskModal());
    dispatch(clearCurrentTask());
  };

  // mutation to move task to another column
  // const handleColumnMove = (columnId: string, taskId: string) => {
  //   mutate({ columnId, taskId });
  // };

  useEffect(() => {
    setCompletedSubtaskCount(
      currentTask?.subtasks.filter((subtask) => subtask.completed).length,
    );
  }, [currentTask?.subtasks]);

  // if (error) return <p>Error</p>;

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="">{currentTask?.title}</h2>
        <div className="flex items-center gap-2">
          <ViewTaskMenu />
          <button onClick={() => handleClose()}>
            <XIcon className="h-6 w-6 stroke-red-600" />
          </button>
        </div>
      </div>
      <div className="w-full space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-lg text-slate">{currentTask?.description}</p>
        </div>

        <div className="relative flex flex-col gap-2">
          <span className="text-body-md text-slate">{`Subtasks (${completedSubtaskCount} of ${currentTask?.subtasks?.length})`}</span>
        </div>

        <ul className="flex w-full flex-col gap-4">
          {currentTask?.subtasks?.map((subtask) => (
            <Subtask
              key={subtask.id}
              subtask={subtask}
              updateCount={setCompletedSubtaskCount}
            />
          ))}
        </ul>
        <div className="flex w-full flex-col gap-4">
          <span className="text-body-md text-slate">Current Status</span>
          <Select
            control={control}
            name="columnId"
            // handleColumnMove={handleColumnMove}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
