import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/ui/Button";
import { selectErrorMessage } from "~/store/selectors";
import { clearError } from "~/store/uiSlice";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="">Something went wrong</h2>
      <p>{errorMessage}! Please try again.</p>
      <Button variant="delete" wide onClick={() => dispatch(clearError())}>
        <span>OK</span>
      </Button>
    </div>
  );
};

export default ErrorModal;
