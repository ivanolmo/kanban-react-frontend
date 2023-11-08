import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { toggleSidebar } from "~/store/uiSlice";
import OpenSidebarIcon from "~/components/svg/OpenSidebarIcon";
import { selectShowSidebar } from "~/store/selectors";

const SidebarToggle: React.FC = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector(selectShowSidebar);

  return (
    <div
      className={clsx(
        "absolute bottom-8 left-0 hidden cursor-pointer items-center justify-center rounded-r-full bg-violet-700 p-5 transition hover:bg-violet-400 md:flex",
        showSidebar ? "-translate-x-full" : "translate-x-0",
      )}
      onClick={() => dispatch(toggleSidebar())}
    >
      <OpenSidebarIcon />
    </div>
  );
};

export default SidebarToggle;
