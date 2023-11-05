import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import type { NextPage } from "next/types";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";

import AddColumn from "~/components/column/AddColumn";
import Column from "~/components/column/Column";
import Header from "~/components/header/Header";
import Sidebar from "~/components/sidebar/Sidebar";
import Button from "~/components/ui/Button";
import { useGetBoardsQuery } from "~/store/api";
import { toggleSidebar } from "~/store/uiSlice";
import type { RootState } from "~/store/store";
import OpenSidebarIcon from "~/assets/OpenSidebarIcon";
import clsx from "clsx";

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  console.log("session -> ", session);

  const dispatch = useDispatch();
  const queryResult = useGetBoardsQuery();

  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard,
  );
  const showSidebar = useSelector((state: RootState) => state.ui.showSidebar);

  // console.log("boards -> ", boards);

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

  if (queryResult.isLoading) {
    return <div>Loading boards...</div>;
  }

  if (queryResult.isError) {
    return <div>Error loading boards</div>;
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
          <ScrollContainer
            className={clsx(
              "flex gap-6 px-4 py-6 duration-300 ease-in-out md:px-6",
              showSidebar ? "ml-64" : "ml-0",
            )}
            buttons={[0, 1]}
            vertical={true}
          >
            {currentBoard?.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            <AddColumn />
          </ScrollContainer>
        </div>
        <div
          className={clsx(
            "absolute bottom-8 left-0 hidden cursor-pointer items-center justify-center rounded-r-full bg-violet-700 p-5 transition hover:bg-violet-400 md:flex",
            showSidebar ? "-translate-x-full" : "translate-x-0",
          )}
          onClick={() => dispatch(toggleSidebar())}
        >
          <OpenSidebarIcon />
        </div>
      </main>
    </>
  );
};

export default Home;
