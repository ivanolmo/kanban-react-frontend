import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useEffect } from "react";

import AuthPage from "~/components/auth/AuthPage";

const AuthForm: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/boards");
    }
  }, [session, status, router]);

  if (status === "loading" || status === "authenticated") {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <AuthPage />
    </main>
  );
};

export default AuthForm;
