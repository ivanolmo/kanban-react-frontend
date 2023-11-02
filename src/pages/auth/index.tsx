import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthPage from "~/components/auth/AuthPage";
import { useEffect } from "react";

export default function AuthForm() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      void router.push("/");
    }
  }, [router, session]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <AuthPage />
    </div>
  );
}
