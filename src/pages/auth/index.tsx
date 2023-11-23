import type { NextPage } from "next/types";

import AuthPage from "~/components/auth/AuthPage";

const AuthForm: NextPage = () => {
  return (
    <main className="h-screen w-screen flex-col items-center justify-center md:flex">
      <AuthPage />
    </main>
  );
};

export default AuthForm;
