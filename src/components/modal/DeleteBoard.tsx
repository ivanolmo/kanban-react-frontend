import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/ui/Button";
import { selectCurrentBoard } from "~/store/selectors";
import { toggleDeleteBoardModal } from "~/store/uiSlice";
import { useDeleteBoardMutation } from "~/store/api";

const DeleteBoard = () => {
  const [deleteBoard, { isLoading, error }] = useDeleteBoardMutation();
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);

  const handleDelete = async () => {
    try {
      await deleteBoard(currentBoard!.id);
      dispatch(toggleDeleteBoardModal());
    } catch (err) {
      console.log("err -> ", err);
    }
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Deleting...</p>;

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
