import { useDispatch, useSelector } from "react-redux";

import AddIcon from "~/components/svg/AddIcon";
import BoardIcon from "~/components/svg/BoardIcon";
import CloseSidebarIcon from "~/components/svg/CloseSidebarIcon";
import SidebarItem from "~/components/sidebar/SidebarItem";
import type { RootState } from "~/store/store";
import { toggleSidebar } from "~/store/uiSlice";
import ThemeSwitcher from "~/components/sidebar/ThemeSwitcher";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.board.boards);

  return (
    <aside
      className="z-10 hidden !w-64 flex-shrink-0 md:block"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-between h-screen py-8 bg-white border-r border-indigo text-slate dark:border-gunmetal-700 dark:bg-gunmetal-800">
        <div>
          <h4 className="ml-6 uppercase">All Boards ({boards?.length || 0})</h4>
          <ul className="mt-5">
            {boards?.map((board) => (
              <SidebarItem key={board.id} board={board} />
            ))}
            <li className="px-6 py-4 mr-4 transition rounded-r-full cursor-pointer hover:bg-violet-700/10 dark:hover:bg-white">
              <div
                className="flex items-center gap-3 font-bold text-md"
                // onClick={() => store.toggleAddBoardModal()}
              >
                <BoardIcon className="fill-violet-700" />
                <span className="flex items-center gap-1 text-violet-700">
                  <AddIcon className="fill-violet-700" />
                  Create New Board
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <ThemeSwitcher />
          <div
            className="group mr-4 flex cursor-pointer items-center gap-3 rounded-r-full px-4 py-3.5 transition hover:bg-violet-700/10 dark:hover:bg-white"
            onClick={() => dispatch(toggleSidebar())}
          >
            <CloseSidebarIcon className="fill-slate group-hover:fill-violet-700" />
            <span className="font-bold text-slate group-hover:text-violet-700">
              Hide Sidebar
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
