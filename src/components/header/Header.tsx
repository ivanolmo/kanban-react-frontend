import { useDispatch, useSelector } from "react-redux";

import AddIcon from "~/assets/AddIcon";
import Logo from "~/assets/Logo";
import Button from "~/components/ui/Button";
import Submenu from "~/components/ui/Submenu";
import { toggleShowSubmenu } from "~/store/uiSlice";
import type { RootState } from "~/store/store";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);
  const showSubmenu = useSelector((state: RootState) => state.ui.showSubmenu);
  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard,
  );

  const toggleMenu = () => dispatch(toggleShowSubmenu());

  return (
    <header className="flex h-16 items-center bg-white dark:bg-gunmetal-800 md:h-20 lg:h-24">
      <div
        className={`hidden h-full items-center border-r border-indigo px-4 dark:border-gunmetal-700 md:flex md:px-6 ${
          showSidebar && "w-64"
        }`}
      >
        <span className="dark:hidden">
          <Logo className="hidden md:block" />
        </span>
        <span className="hidden dark:inline">
          <Logo className="hidden md:block" dark />
        </span>
      </div>
      <div className="flex w-full flex-1 items-center justify-between pl-4 md:pl-6 md:pr-2">
        {/* <SidebarMobile
          // TODO only needs names not all board data?
          boards={props.boards}
        /> */}
        <h1 className="hidden capitalize md:block">
          {currentBoard?.name ?? "No Boards"}
        </h1>
        <div className="flex items-center gap-1 md:gap-2.5">
          <div>
            <Button
              variant="primary"
              size="lg"
              disabled={!currentBoard?.columns.length}
              // onClick={() => store.toggleAddTaskModal()}
            >
              <AddIcon className="fill-white" />
              <span className="hidden md:inline">Add New Task</span>
            </Button>
          </div>
          <Submenu
            showMenu={showSubmenu}
            // handleDelete={handleDelete}
            // handleEdit={handleEdit}
            toggleMenu={toggleMenu}
            withSignOut
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
