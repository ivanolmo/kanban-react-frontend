import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "~/components/svg/EditIcon";
import MenuIcon from "~/components/svg/MenuIcon";
import SignoutIcon from "~/components/svg/SignoutIcon";
import XIcon from "~/components/svg/XIcon";
import { toggleDeleteBoardModal, toggleSubmenu } from "~/store/uiSlice";
import { selectBoards } from "~/store/selectors";

type SubmenuProps = {
  showMenu: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
  withSignOut?: boolean;
};

const Submenu: React.FC<SubmenuProps> = (props) => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  const submenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

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
      className="relative cursor-pointer px-4"
      onClick={() => dispatch(toggleSubmenu())}
    >
      <div ref={buttonRef}>
        <MenuIcon className={`transition ${props.showMenu && "rotate-90"}`} />
      </div>
      {props.showMenu && (
        <div
          className="shadow-x absolute right-0 top-12 flex w-48 flex-col gap-6 rounded-xl bg-white p-4 dark:bg-zinc lg:right-1"
          ref={submenuRef}
        >
          <span
            className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
              boards ? !boards?.length && "hidden" : null
            }`}
            // onClick={() => props.handleEdit()}
          >
            {`Edit ${boards ? "Board" : "Task"}`}
            <EditIcon className="h-6 w-6 fill-white stroke-slate transition group-hover:stroke-gunmetal-700 dark:fill-transparent dark:group-hover:stroke-white" />
          </span>
          <span
            className={`group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400 ${
              boards ? !boards?.length && "hidden" : null
            }`}
            onClick={() => dispatch(toggleDeleteBoardModal())}
          >
            {`Delete ${boards ? "Board" : "Task"}`}
            <XIcon className="h-6 w-6 stroke-red-600 transition group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
          </span>
          {props.withSignOut && (
            <span
              className="group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign Out
              <SignoutIcon className="h-6 w-6 fill-transparent stroke-red-600 transition group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Submenu;
