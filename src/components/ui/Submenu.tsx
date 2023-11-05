import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "~/assets/EditIcon";
import MenuIcon from "~/assets/MenuIcon";
import SignoutIcon from "~/assets/SignoutIcon";
import XIcon from "~/assets/XIcon";
import { toggleSubmenu } from "~/store/uiSlice";
import type { RootState } from "~/store/store";

type SubmenuProps = {
  showMenu: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
  withSignOut?: boolean;
};

const Submenu: React.FC<SubmenuProps> = (props) => {
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.board.boards);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        submenuRef.current &&
        buttonRef.current &&
        !submenuRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        dispatch(toggleSubmenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      className="relative px-4 cursor-pointer"
      onClick={() => dispatch(toggleSubmenu())}
    >
      <div ref={buttonRef}>
        <MenuIcon className={`transition ${props.showMenu && "rotate-90"}`} />
      </div>
      {props.showMenu && (
        <div
          className="absolute right-0 flex flex-col w-48 gap-6 p-4 bg-white shadow-x top-12 rounded-xl dark:bg-zinc lg:right-1"
          ref={submenuRef}
        >
          <span
            className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
              boards ? !boards?.length && "hidden" : null
            }`}
            // onClick={() => props.handleEdit()}
          >
            {`Edit ${boards ? "Board" : "Task"}`}
            <EditIcon className="w-6 h-6 transition fill-white stroke-slate group-hover:stroke-gunmetal-700 dark:fill-transparent dark:group-hover:stroke-white" />
          </span>
          <span
            className={`group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400 ${
              boards ? !boards?.length && "hidden" : null
            }`}
            // onClick={() => props.handleDelete()}
          >
            {`Delete ${boards ? "Board" : "Task"}`}
            <XIcon className="w-6 h-6 transition stroke-red-600 group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
          </span>
          {props.withSignOut && (
            <span
              className="flex items-center justify-between text-red-600 transition cursor-pointer group hover:text-red-900 dark:hover:text-red-400"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign Out
              <SignoutIcon className="w-6 h-6 transition fill-transparent stroke-red-600 group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Submenu;
