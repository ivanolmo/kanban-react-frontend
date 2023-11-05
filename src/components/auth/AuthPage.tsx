import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import LeftOverlayContent from "~/components/auth/LeftOverlayContent";
import RightOverlayContent from "~/components/auth/RightOverlayContent";
import SigninForm from "~/components/auth/SigninForm";
import SignupForm from "~/components/auth/SignupForm";

const AuthPage: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [error, setError] = useState("");

  const signinFormMethods = useForm();
  const signupFormMethods = useForm();

  const resetError = () => setError("");

  const overlayBg =
    "bg-gradient-to-r from-violet-700 via-violet-900 to-violet-700";

  return (
    <div className="relative w-4/5 overflow-hidden bg-white h-4/5 rounded-3xl">
      <div
        id="signin"
        className={`absolute left-0 top-0 z-20 flex h-full w-1/2 items-center justify-center bg-white transition-all duration-700 ease-in-out ${
          isAnimated ? "translate-x-full opacity-0" : ""
        }`}
      >
        <FormProvider {...signinFormMethods}>
          <SigninForm
            error={error}
            setError={setError}
            resetError={resetError}
          />
        </FormProvider>
      </div>

      <div
        id="signup"
        className={`absolute left-0 top-0 flex h-full w-1/2 items-center justify-center transition-all duration-700 ease-in-out ${
          isAnimated
            ? "animate-show z-50 translate-x-full opacity-100"
            : "z-10 opacity-0"
        }`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <FormProvider {...signupFormMethods}>
            <SignupForm
              error={error}
              setError={setError}
              resetError={resetError}
            />
          </FormProvider>
        </div>
      </div>

      <div
        id="overlay-container"
        className={`absolute left-1/2 top-0 z-100 h-full w-1/2 overflow-hidden transition-transform duration-700 ease-in-out ${
          isAnimated ? "-translate-x-full" : ""
        }`}
      >
        <div
          id="overlay"
          className={`${overlayBg} relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
            isAnimated ? "translate-x-1/2" : "translate-x-0"
          }`}
        >
          <div
            id="overlay-left"
            className={`absolute top-0 flex h-full w-1/2 -translate-x-[20%] transform items-center justify-center transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-0" : "-translate-x-[20%]"
            }`}
          >
            <LeftOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
              signupFormMethods={signupFormMethods}
              resetError={resetError}
            />
          </div>
          <div
            id="overlay-right"
            className={`absolute right-0 top-0 flex h-full w-1/2 transform items-center justify-center transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-[20%]" : "translate-x-0"
            }`}
          >
            <RightOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
              signinFormMethods={signinFormMethods}
              resetError={resetError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
