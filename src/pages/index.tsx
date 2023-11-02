import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

import Button from "~/components/ui/Button";

type BoardSubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type BoardTask = {
  id: string;
  title: string;
  description: string;
  subtasks: BoardSubTask[];
};

type BoardColumn = {
  id: string;
  name: string;
  tasks: BoardTask[];
};

type Board = {
  id: string;
  name: string;
  columns: BoardColumn[];
};

type ApiBoardResponse = {
  data: Board[];
  success: boolean;
  message: string;
  error: null | string;
  status: string;
};

const fetcher = async (url: string, accessToken?: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const response = (await res.json()) as ApiBoardResponse;

  if (!res.ok) {
    throw new Error(response.error ?? "An error occurred");
  }

  return response;
};

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { data: boards, isLoading: boardsLoading } = useSWR(
    session?.user.access_token
      ? [
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/boards`,
          session?.user.access_token,
        ]
      : null,
    ([url, accessToken]) => fetcher(url, accessToken),
  );

  console.log("index session -> ", session);
  console.log("boards -> ", boards);

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

  if (boardsLoading) {
    return <div>Loading swr...</div>;
  }

  return (
    <>
      <h1>there is a session</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <ul>
        {boards?.data.map((board) => (
          <div key={board.id}>
            <p>board id: {board.id}</p>
            <p>board name: {board.name}</p>
          </div>
        ))}
      </ul>
    </>
  );
}
