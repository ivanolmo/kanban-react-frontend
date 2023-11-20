import type { NextPage } from "next/types";

import AuthPage from "~/components/auth/AuthPage";
import Loader from "~/components/ui/Loader";

const AuthForm: NextPage = () => {
  return (
    <main className="h-screen w-screen flex-col items-center justify-center md:flex">
      {false ? <Loader color="#635fc7" size={24} /> : <AuthPage />}
    </main>
  );
};

export default AuthForm;
