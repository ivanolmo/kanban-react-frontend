import { type useFormContext } from "react-hook-form";

interface RightOverlayContentProps {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  signinFormMethods: ReturnType<typeof useFormContext>;
  resetError: () => void;
}

export default function RightOverlayContent({
  isAnimated,
  setIsAnimated,
  signinFormMethods,
  resetError,
}: RightOverlayContentProps) {
  const handleSwitchToSignup = () => {
    resetError();
    signinFormMethods.reset();
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">
        Don&apos;t have an account ?
      </h1>
      <h5 className="text-xl text-white">Sign up to save your Kanban boards</h5>
      <div className="mt-16">
        <button
          className="px-6 py-3 text-xl font-bold text-center text-white uppercase transition-transform ease-in bg-transparent rounded-full ring-2 ring-white active:scale-110"
          onClick={handleSwitchToSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
