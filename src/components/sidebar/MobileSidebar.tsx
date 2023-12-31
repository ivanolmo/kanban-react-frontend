import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalContainer from "~/components/modal/ModalContainer";
import SidebarItem from "~/components/sidebar/SidebarItem";
import ThemeSwitcher from "~/components/sidebar/ThemeSwitcher";
import AddIcon from "~/components/svg/AddIcon";
import BoardIcon from "~/components/svg/BoardIcon";
import ChevronDownIcon from "~/components/svg/ChevronDownIcon";
import LogoMobile from "~/components/svg/LogoMobile";
import Loader from "~/components/ui/Loader";
import { useGetBoardsQuery } from "~/store/api";
import {
  selectBoards,
  selectCurrentBoard,
  selectShowMobileSidebar,
} from "~/store/selectors";
import { toggleAddBoardModal, toggleMobileSidebar } from "~/store/uiSlice";

const MobileSidebar: React.FC = () => {
  const { isLoading } = useGetBoardsQuery();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const showMobileSidebar = useSelector(selectShowMobileSidebar);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleAddBoard = () => {
    dispatch(toggleMobileSidebar());
    dispatch(toggleAddBoardModal());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        dispatch(toggleMobileSidebar());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="flex w-fit cursor-pointer items-center gap-4 md:hidden">
      <LogoMobile />
      <div
        className="flex items-center gap-2"
        onClick={() => dispatch(toggleMobileSidebar())}
        ref={buttonRef}
      >
        <h2 className="w-36 capitalize">
          {isLoading ? (
            <Loader
              size={8}
              color="#635fc7"
              data-testid="mobile-sidebar-loader"
            />
          ) : (
            currentBoard?.name ?? "No Boards"
          )}
        </h2>
        <div className={clsx("mt-1 cursor-pointer", isLoading && "hidden")}>
          <ChevronDownIcon
            className={clsx(
              "stroke-violet-700 transition",
              showMobileSidebar && "rotate-180",
            )}
          />
        </div>
      </div>
      {showMobileSidebar && (
        <ModalContainer mobile>
          <div
            className="z-50 w-full max-w-sm overflow-hidden rounded-xl"
            ref={sidebarRef}
          >
            <div className="flex flex-col bg-white text-slate dark:bg-gunmetal-800">
              <div>
                <span className="block p-4 text-sm font-bold uppercase tracking-[2.4px]">
                  All Boards ({boards?.length ?? 0})
                </span>
                <ul className="pr-2">
                  {boards?.map((board) => (
                    <SidebarItem key={board.id} board={board} />
                  ))}
                  <li className="mr-4 cursor-pointer rounded-r-full px-6 py-4 transition hover:bg-violet-700/10 dark:hover:bg-white">
                    <div
                      className="flex items-center gap-3 text-md font-bold "
                      onClick={() => handleAddBoard()}
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
              <div className="py-4">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};

export default MobileSidebar;
