import { getSession, signIn, type GetSessionParams } from "next-auth/react";
import Image from "next/image";
import type { GetServerSideProps, NextPage } from "next/types";

import Button from "~/components/ui/Button";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
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
};

export default Home;

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
