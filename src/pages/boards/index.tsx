import { useWindowSize } from "@uidotdev/usehooks";
import type { NextPage } from "next/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoBoardOrEmptyBoard from "~/components/board/NoBoardOrEmptyBoard";
import ColumnScrollContainer from "~/components/column/ColumnScrollContainer";
import Header from "~/components/header/Header";
import CurrentModal from "~/components/modal/CurrentModal";
import Sidebar from "~/components/sidebar/Sidebar";
import SidebarToggle from "~/components/sidebar/SidebarToggle";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useGetBoardsQuery } from "~/store/api";
import { clearCurrentBoard, setCurrentBoard } from "~/store/boardSlice";
import {
  selectCurrentBoard,
  selectShowMobileSidebar,
  selectShowSidebar,
} from "~/store/selectors";
import { toggleMobileSidebar, toggleSidebar } from "~/store/uiSlice";

const Boards: NextPage = () => {
  const dispatch = useDispatch();
  const { data: boards, isLoading, error } = useGetBoardsQuery();
  const currentBoard = useSelector(selectCurrentBoard);
  const showSidebar = useSelector(selectShowSidebar);
  const showMobileSidebar = useSelector(selectShowMobileSidebar);

  const size = useWindowSize();
  const handleError = useHandleError();

  // closes mobile or regular sidebar on media query
  useEffect(() => {
    if (size.width && size.width <= 768 && showSidebar) {
      dispatch(toggleSidebar());
    }

    if (size.width && size.width > 768 && showMobileSidebar) {
      dispatch(toggleMobileSidebar());
    }
  }, [dispatch, showMobileSidebar, showSidebar, size.width]);

  // sets the first board as the current board when the app loads
  useEffect(() => {
    // check if 'boards' is an array and has at least one element
    if (boards && boards.length > 0) {
      // if 'currentBoard' is not set, dispatch the first board
      if (!currentBoard) {
        const firstBoard = boards[0];
        // make sure that 'firstBoard' is not undefined before dispatching.
        if (firstBoard) {
          dispatch(setCurrentBoard(firstBoard));
        }
      }
    } else {
      // if 'boards' is not an array or has no elements, clear the current board
      dispatch(clearCurrentBoard());
    }
  }, [boards, currentBoard, dispatch]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  return (
    <>
      <Header />
      <main>
        <div className="flex h-screen">
          <div
            className={`absolute left-0 duration-300 ease-in-out ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          {isLoading ? (
            <Loader message="Getting Your Data..." color="#635fc7" size={24} />
          ) : boards?.length === 0 || currentBoard?.columns.length === 0 ? (
            <NoBoardOrEmptyBoard />
          ) : (
            <ColumnScrollContainer />
          )}
        </div>
        <SidebarToggle />
        <CurrentModal />
      </main>
    </>
  );
};

export default Boards;
