import type { useFormContext } from "react-hook-form";

type LeftOverlayContentProps = {
  isAnimated: boolean;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  signupFormMethods: ReturnType<typeof useFormContext>;
  resetError: () => void;
};

const LeftOverlayContent: React.FC<LeftOverlayContentProps> = ({
  isAnimated,
  setIsAnimated,
  signupFormMethods,
  resetError,
}) => {
  const handleSwitchToSignin = () => {
    resetError();
    signupFormMethods.reset();
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl mb-4 font-bold text-white">
        Already have an account ?
      </h1>
      <h5 className="text-xl text-white">Sign in with your email & password</h5>
      <div className="mt-16">
        <button
          id="signin-overlay-btn"
          className="rounded-full bg-transparent px-6 py-3 text-center text-xl font-bold uppercase text-white ring-2 ring-white transition-transform ease-in active:scale-110"
          onClick={handleSwitchToSignin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
