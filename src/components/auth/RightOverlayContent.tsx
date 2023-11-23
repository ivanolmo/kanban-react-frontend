import { type useFormContext } from "react-hook-form";

type RightOverlayContentProps = {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  signinFormMethods: ReturnType<typeof useFormContext>;
  resetError: () => void;
};

const RightOverlayContent: React.FC<RightOverlayContentProps> = ({
  isAnimated,
  setIsAnimated,
  signinFormMethods,
  resetError,
}) => {
  const handleSwitchToSignup = () => {
    resetError();
    signinFormMethods.reset();
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl mb-4 font-bold text-white">
        Don&apos;t have an account ?
      </h1>
      <h5 className="text-xl text-white">Sign up to save your Kanban boards</h5>
      <div className="mt-16">
        <button
          id="signup-overlay-btn"
          className="rounded-full bg-transparent px-6 py-3 text-center text-xl font-bold uppercase text-white ring-2 ring-white transition-transform ease-in active:scale-110"
          onClick={handleSwitchToSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RightOverlayContent;
