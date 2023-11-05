import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ScrollContainer from "react-indiana-drag-scroll";
import { useSelector } from "react-redux";
import type { NextPage } from "next/types";

import AddColumn from "~/components/column/AddColumn";
import Column from "~/components/column/Column";
import Header from "~/components/header/Header";
import Button from "~/components/ui/Button";
import { useGetBoardsQuery } from "~/store/api";
import type { RootState } from "~/store/store";

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  console.log("session -> ", session);

  const queryResult = useGetBoardsQuery();

  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard,
  );

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
        <button onClick={() => signOut()}>sign out</button>
        <div className="flex h-screen">
          <ScrollContainer
            className="flex gap-6 px-4 py-6 duration-300 ease-in-out md:px-6"
            buttons={[0, 1]}
            vertical={true}
          >
            {currentBoard?.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            <AddColumn />
          </ScrollContainer>
        </div>
      </main>
    </>
  );
};

export default Home;
