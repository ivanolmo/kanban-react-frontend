import { type useFormContext } from "react-hook-form";

interface LeftOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  signupFormMethods: ReturnType<typeof useFormContext>;
  resetError: () => void;
}

export default function LeftOverlayContent({
  isAnimated,
  setIsAnimated,
  signupFormMethods,
  resetError,
}: LeftOverlayContentProps) {
  const handleSwitchToSignin = () => {
    resetError();
    signupFormMethods.reset();
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">
        Already have an account ?
      </h1>
      <h5 className="text-xl text-white">Sign in with your email & password</h5>
      <div className="mt-16">
        <button
          className="px-6 py-3 text-xl font-bold text-center text-white uppercase transition-transform ease-in bg-transparent rounded-full ring-2 ring-white active:scale-110"
          onClick={handleSwitchToSignin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
