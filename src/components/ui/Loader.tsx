import clsx from "clsx";
import { PulseLoader } from "react-spinners";

type LoaderProps = {
  size?: number;
  speedMultiplier?: number;
  color?: string;
  loading?: boolean;
  message?: string;
};

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className="m-auto flex flex-col items-center gap-6">
      <p className={clsx(props.message ? "" : "hidden")}>{props.message}</p>
      <PulseLoader {...props} />
    </div>
  );
};

export default Loader;
