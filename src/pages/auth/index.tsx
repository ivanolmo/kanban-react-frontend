import { getSession, useSession, type GetSessionParams } from "next-auth/react";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next/types";
import { useEffect } from "react";

import AuthPage from "~/components/auth/AuthPage";
import Loader from "~/components/ui/Loader";

const AuthForm: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/boards");
    }
  }, [status, router]);

  return (
    <main className="h-screen w-screen flex-col items-center justify-center md:flex">
      {false ? <Loader color="#635fc7" size={24} /> : <AuthPage />}
    </main>
  );
};

export default AuthForm;

export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionParams,
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/boards",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
