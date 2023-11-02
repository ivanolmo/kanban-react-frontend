import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

type AuthResponse = {
  data: {
    user_id: string;
    email: string;
    access_token: string;
  };
  success: boolean;
  message: string;
  status: string;
};

type ErrorResponse = {
  error: string;
  success: boolean;
  message: string;
  status: string;
};

export default function SignupForm({
  error,
  setError,
  resetError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  resetError: () => void;
}) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const response = (await res.json()) as AuthResponse | ErrorResponse;

      if (!response.success) {
        setError(response.message);
        return;
      }

      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        setError(signInResponse.error);
        return;
      }

      resetError();
      setShouldRedirect(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  // a useEffect was required to redirect and avoid a "abort fetchiing component" useRouter error
  useEffect(() => {
    if (shouldRedirect) {
      void router.push("/");
    }
  }, [shouldRedirect, router]);

  return (
    <div className="selection:bg-violet-700 selection:text-white">
      <div className="flex items-center justify-center">
        <div className="flex-1 p-8">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-[3rem] font-bold text-violet-700">
                Create account
              </h1>

              <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="signup-email"
                        type="text"
                        className="auth-input peer"
                        placeholder="john@doe.com"
                      />
                    )}
                  />
                  <label
                    htmlFor="signup-email"
                    className="peer-placeholder-shown:text-md text-slate peer-focus:text-slate absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                  <p
                    className={clsx(
                      "mt-2 h-5 text-sm text-red-900 transition-opacity duration-300",
                      errors.email ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {errors?.email?.message}
                  </p>
                </div>

                <div className="relative mt-6">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="signup-password"
                        type="password"
                        className="auth-input peer"
                        placeholder="Password"
                      />
                    )}
                  />
                  <label
                    htmlFor="signup-password"
                    className="peer-placeholder-shown:text-md text-slate peer-focus:text-slate absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  <p
                    className={clsx(
                      "mt-2 h-5 text-sm text-red-900 transition-opacity duration-300",
                      errors.password ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {errors?.password?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  className="block w-full px-8 py-4 mt-10 font-semibold text-center text-white uppercase transition-colors duration-300 ease-in-out rounded-full cursor-pointer bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-80 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </form>
              <div
                className={clsx(
                  "mt-4 h-5 text-center text-red-900 transition-opacity duration-300",
                  error ? "opacity-100" : "opacity-0",
                )}
              >
                {error || "An error occurred"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
