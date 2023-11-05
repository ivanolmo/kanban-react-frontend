import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import type { FormData } from "~/types";

type SigninFormProps = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  resetError: () => void;
};

const SigninForm: React.FC<SigninFormProps> = ({
  error,
  setError,
  resetError,
}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        resetError();
        setShouldRedirect(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  // a useEffect was required to redirect and avoid a "abort fetching component" useRouter error
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
                Welcome back!
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
                        id="signin-email"
                        type="text"
                        className="auth-input peer"
                        placeholder="john@doe.com"
                      />
                    )}
                  />
                  <label
                    htmlFor="signin-email"
                    className="peer-placeholder-shown:text-gray-400 absolute -top-3.5 left-0 text-sm text-slate transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-md peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-slate"
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
                        id="signin-password"
                        type="password"
                        className="auth-input peer"
                        placeholder="Password"
                      />
                    )}
                  />
                  <label
                    htmlFor="signin-password"
                    className="peer-placeholder-shown:text-gray-400 absolute -top-3.5 left-0 text-sm text-slate transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-md peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-slate"
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
                  className="block w-full px-8 py-4 mt-10 font-semibold text-center text-white uppercase transition-colors duration-300 ease-in-out rounded-full cursor-pointer focus:ring-indigo-500 bg-violet-700 hover:bg-violet-800 focus:outline-none focus:ring focus:ring-opacity-80 focus:ring-offset-2"
                >
                  Sign In
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
};

export default SigninForm;
