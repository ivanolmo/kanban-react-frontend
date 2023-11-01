import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ApiResponse = {
  data: {
    id: string;
    email: string;
    access_token: string;
  };
  success: boolean;
  message: string;
  error: null | string;
  status: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [boards, setBoards] = useState([]);

  const getBoards = async () => {
    const res = await fetch("http://localhost:8080/api/boards", {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    const response = (await res.json()) as ApiResponse;
    console.log("response -> ", response);
    // setBoards(response);
  };

  if (!session) {
    return (
      <div className="grid h-screen">
        <div className="flex flex-col items-center gap-16 place-self-center">
          <div>
            {/* <Image
              src="/assets/logo-main.webp"
              alt="logo"
              width={192}
              height={192}
              priority
            /> */}
          </div>
          <div className="flex flex-col items-center gap-6">
            <span>You must be signed in to use this application!</span>
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>there is a session</h1>
      <button onClick={() => getBoards()}>get boards</button>
    </>
  );
}
