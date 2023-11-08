import { useEffect } from "react";
import Image from "next/image";
import type { NextPage } from "next/types";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import ColumnScrollContainer from "~/components/column/ColumnScrollContainer";
import Header from "~/components/header/Header";
import CurrentModal from "~/components/modal/CurrentModal";
import Sidebar from "~/components/sidebar/Sidebar";
import OpenSidebarIcon from "~/components/svg/OpenSidebarIcon";
import Button from "~/components/ui/Button";
import { useGetBoardsQuery } from "~/store/api";
import { clearCurrentBoard, setCurrentBoard } from "~/store/boardSlice";
import { toggleSidebar } from "~/store/uiSlice";
import { selectCurrentBoard, selectShowSidebar } from "~/store/selectors";
import NoBoardOrEmptyBoard from "~/components/board/NoBoardOrEmptyBoard";
import SidebarToggle from "~/components/sidebar/SidebarToggle";

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  console.log(session);
  const { data: boards, isLoading, isError } = useGetBoardsQuery();
  const dispatch = useDispatch();

  const currentBoard = useSelector(selectCurrentBoard);
  const showSidebar = useSelector(selectShowSidebar);

  // sets the first board as the current board when the app loads
  useEffect(() => {
    // check if 'boards' is an array and has at least one element
    if (Array.isArray(boards) && boards.length > 0) {
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

  if (sessionStatus === "loading") {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return (
      <div className="grid h-screen">
        <div className="flex flex-col items-center gap-16 place-self-center">
          <div>
            <Image
              src="/assets/logo-main.webp"
              alt="logo"
              width={192}
              height={192}
              priority
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <span>You must be signed in to use this application!</span>
            <Button onClick={() => signIn()}>Sign in</Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading boards...</div>;
  }

  if (isError) {
    return (
      <div>
        <span>Error</span>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

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
          {boards?.length === 0 || currentBoard?.columns.length === 0 ? (
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

export default Home;
