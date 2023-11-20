import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/ui/Button";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useDeleteTaskMutation } from "~/store/api";
import { clearCurrentTask } from "~/store/boardSlice";
import { selectCurrentTask } from "~/store/selectors";
import { toggleDeleteTaskModal } from "~/store/uiSlice";

const DeleteTask: React.FC = () => {
  const dispatch = useDispatch();
  const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();
  const currentTask = useSelector(selectCurrentTask);

  const handleError = useHandleError();

  const handleDelete = async () => {
    await deleteTask(currentTask!.id).unwrap();
    dispatch(toggleDeleteTaskModal());
    dispatch(clearCurrentTask());
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  if (isLoading)
    return <Loader message="Deleting Task..." color="#635fc7" size={16} />;

  return (
    <div className="z-[99999] flex flex-col gap-6">
      <h2 className="text-red-600">Delete this task?</h2>
      <p className="text-body-lg text-slate">
        Are you sure you want to delete the{" "}
        <span className="capitalize">&apos;{currentTask?.title}&apos;</span>{" "}
        task? This action will remove all{" "}
        <span className="font-bold">{currentTask?.subtasks?.length}</span>{" "}
        subtasks and cannot be reversed!
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button variant="delete" wide onClick={() => handleDelete()}>
          <span>Delete</span>
        </Button>
        <Button
          variant="secondary"
          wide
          onClick={() => dispatch(toggleDeleteTaskModal())}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
