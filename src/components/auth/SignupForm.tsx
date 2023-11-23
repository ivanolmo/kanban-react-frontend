import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import type { AuthSuccessResponse, AuthErrorResponse, FormData } from "~/types";

type SignupFormProps = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  resetError: () => void;
};

const SignupForm: React.FC<SignupFormProps> = ({
  error,
  setError,
  resetError,
}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
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

      const response = (await res.json()) as
        | AuthSuccessResponse
        | AuthErrorResponse;

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
              <p className="font-bold text-violet-700 md:hidden">
                Are you a new user?
              </p>
              <h1 className="text-[3rem] font-bold text-violet-700">
                Create account
              </h1>

              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    }}
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
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters long",
                      },
                    }}
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

                <div className="relative mt-6">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === watch("password") ||
                        "The passwords do not match",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="signup-password-confirmation"
                        type="password"
                        className="auth-input peer"
                        placeholder="Confirm Password"
                      />
                    )}
                  />
                  <label
                    htmlFor="signup-password-confirmation"
                    className="peer-placeholder-shown:text-gray-400 absolute -top-3.5 left-0 text-sm text-slate transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-md peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-slate"
                  >
                    Confirm Password
                  </label>
                  <p
                    className={clsx(
                      "mt-2 h-5 text-sm text-red-900 transition-opacity duration-300",
                      errors.confirmPassword ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {errors?.confirmPassword?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  className="focus:ring-indigo-500 mt-10 block w-full cursor-pointer rounded-full bg-violet-700 px-8 py-4 text-center font-semibold uppercase text-white transition-colors duration-300 ease-in-out hover:bg-violet-800 focus:outline-none focus:ring focus:ring-opacity-80 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </form>
              <div
                id="signup-error"
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

export default SignupForm;
