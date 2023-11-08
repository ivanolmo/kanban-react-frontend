import { useSelector } from "react-redux";

import HeaderMenu from "~/components/header/HeaderMenu";
import AddIcon from "~/components/svg/AddIcon";
import Logo from "~/components/svg/Logo";
import Button from "~/components/ui/Button";
import { selectCurrentBoard, selectShowSidebar } from "~/store/selectors";

const Header: React.FC = () => {
  const showSidebar = useSelector(selectShowSidebar);
  const currentBoard = useSelector(selectCurrentBoard);

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
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
