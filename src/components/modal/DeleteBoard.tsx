import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/ui/Button";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useDeleteBoardMutation } from "~/store/api";
import { selectCurrentBoard } from "~/store/selectors";
import { toggleDeleteBoardModal } from "~/store/uiSlice";

const DeleteBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [deleteBoard, { isLoading, error }] = useDeleteBoardMutation();
  const currentBoard = useSelector(selectCurrentBoard);

  const handleError = useHandleError();

  const handleDelete = async () => {
    await deleteBoard(currentBoard!.id);
    dispatch(toggleDeleteBoardModal());
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  if (isLoading)
    return <Loader message="Deleting Board..." color="#635fc7" size={16} />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-red-600">Delete this board?</h2>
      <p className="text-body-lg text-slate">
        Are you sure you want to delete the{" "}
        <span className="capitalize">&apos;{currentBoard?.name}&apos;</span>{" "}
        board? This action will remove all columns and tasks and cannot be
        reversed!
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button variant="delete" wide onClick={() => handleDelete()}>
          <span>Delete</span>
        </Button>
        <Button
          variant="secondary"
          wide
          onClick={() => dispatch(toggleDeleteBoardModal())}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteBoard;
