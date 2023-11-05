import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import AuthPage from "~/components/auth/AuthPage";

const AuthForm: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      void router.push("/");
    }
  }, [router, session]);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <AuthPage />
    </main>
  );
};

export default AuthForm;
