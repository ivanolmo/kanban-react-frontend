import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import HeaderMenu from "~/components/header/HeaderMenu";
import SidebarMobile from "~/components/sidebar/MobileSidebar";
import AddIcon from "~/components/svg/AddIcon";
import BoardIcon from "~/components/svg/BoardIcon";
import Logo from "~/components/svg/Logo";
import SearchIcon from "~/components/svg/SearchIcon";
import Button from "~/components/ui/Button";
import { selectCurrentBoard, selectShowSidebar } from "~/store/selectors";
import { toggleAddTaskModal, toggleSearch } from "~/store/uiSlice";

type HeaderProps = {
  report?: boolean;
  boardName?: string;
};

const Header: React.FC<HeaderProps> = ({ report, boardName }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showSidebar = useSelector(selectShowSidebar);
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <header className="flex h-16 items-center bg-white dark:bg-gunmetal-800 md:h-20 lg:h-24">
      <div
        className={clsx(
          "hidden h-full items-center border-r border-indigo px-4 dark:border-gunmetal-700 md:flex md:px-6",
          showSidebar && "w-64",
        )}
      >
        <Link href="/">
          <span className="dark:hidden">
            <Logo className="hidden md:block" />
          </span>
          <span className="hidden dark:inline">
            <Logo className="hidden md:block" dark />
          </span>
        </Link>
      </div>
      <div className="flex w-full flex-1 items-center justify-between pl-4 md:pl-6 md:pr-2">
        {!report && <SidebarMobile />}
        <h1
          className={clsx("truncate capitalize md:block", !report && "hidden")}
        >
          {report
            ? `${boardName ?? "No Board"} Report Generated`
            : currentBoard?.name ?? "No Boards"}
        </h1>
        <div className="flex items-center gap-1 md:gap-2.5">
          {report ? (
            <>
              <div className="flex min-w-fit gap-4">
                <Button size="lg" onClick={() => router.push("/boards")}>
                  <BoardIcon className="fill-white" />
                  <span className="hidden md:inline">Back To Boards</span>
                </Button>
              </div>
              <HeaderMenu report />
            </>
          ) : (
            <>
              <div className="flex min-w-fit gap-4">
                <Button size="lg" onClick={() => dispatch(toggleSearch())}>
                  <SearchIcon className="fill-white" />
                  <span className="hidden md:inline">Search</span>
                </Button>
                <Button
                  size="lg"
                  disabled={!currentBoard?.columns.length}
                  onClick={() => dispatch(toggleAddTaskModal())}
                >
                  <AddIcon className="fill-white" />
                  <span className="hidden md:inline">Add New Task</span>
                </Button>
              </div>
              <HeaderMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
