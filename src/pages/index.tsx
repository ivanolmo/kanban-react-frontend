import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import ScrollContainer from "react-indiana-drag-scroll";
import useSWR from "swr";

import AddColumn from "~/components/column/AddColumn";
import Column from "~/components/column/Column";
import Button from "~/components/ui/Button";

import { type ApiBoardResponse } from "~/types";

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
      <main>
        <h1>Board Title: {boards?.data[0]?.name}</h1>
        <div className="flex h-screen">
          <ScrollContainer
            className="flex gap-6 px-4 py-6 duration-300 ease-in-out md:px-6"
            buttons={[0, 1]}
            vertical={true}
          >
            {boards?.data[0]?.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            <AddColumn />
          </ScrollContainer>
        </div>
      </main>
    </>
  );
}
