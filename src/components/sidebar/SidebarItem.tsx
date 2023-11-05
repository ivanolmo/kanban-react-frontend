import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import BoardIcon from "~/components/svg/BoardIcon";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleMobileSidebar } from "~/store/uiSlice";
import type { RootState } from "~/store/store";
import type { Board } from "~/types";

type SidebarItemProps = {
  board: Board;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ board }) => {
  const dispatch = useDispatch();

  // Get the currentBoard from the redux store
  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard,
  );

  const handleSelect = () => {
    // dispatch(toggleMobileSidebar());
    dispatch(setCurrentBoard(board));
  };

  const isSelected = board.id === currentBoard?.id;

  return (
    <li
      className={clsx(
        "mr-4 cursor-pointer rounded-r-full px-6 py-4 transition",
        isSelected
          ? "bg-violet-700 text-white"
          : "hover:bg-violet-700/10 hover:text-violet-700 dark:hover:bg-white",
      )}
      onClick={handleSelect}
    >
      <div className="flex items-center gap-3 text-md font-bold">
        <BoardIcon className="fill-current" />
        <span className="capitalize">{board.name}</span>
      </div>
    </li>
  );
};

export default SidebarItem;
