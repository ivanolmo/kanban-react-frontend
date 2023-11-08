import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectCurrentBoard } from "~/store/selectors";
import Button from "../ui/Button";
import AddIcon from "../svg/AddIcon";
import { toggleAddBoardModal, toggleEditBoardModal } from "~/store/uiSlice";

const NoBoardOrEmptyBoard = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <section className="m-auto flex max-w-xs flex-1 flex-col items-center gap-6 lg:max-w-lg">
      {boards?.length === 0 && (
        <>
          <h2 className="text-center text-slate">
            You haven&apos;t created any boards yet. Add one below to get
            started!
          </h2>
          <Button
            variant="primary"
            size="lg"
            onClick={() => dispatch(toggleAddBoardModal())}
          >
            <AddIcon className="fill-white" />
            <span>Create New Board</span>
          </Button>
        </>
      )}
      {currentBoard?.columns?.length === 0 && (
        <>
          <h2 className="text-center text-slate">
            This board is empty. Create a new column to get started!
          </h2>
          <Button
            variant="primary"
            size="lg"
            onClick={() => dispatch(toggleEditBoardModal())}
          >
            <AddIcon className="fill-white" />
            <span>Add New Column</span>
          </Button>
        </>
      )}
    </section>
  );
};

export default NoBoardOrEmptyBoard;
