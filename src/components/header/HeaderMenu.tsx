import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DarkThemeIcon from "~/components/svg/DarkThemeIcon";
import EditIcon from "~/components/svg/EditIcon";
import LightThemeIcon from "~/components/svg/LightThemeIcon";
import MenuIcon from "~/components/svg/MenuIcon";
import ReportsIcon from "~/components/svg/ReportsIcon";
import SignoutIcon from "~/components/svg/SignoutIcon";
import XIcon from "~/components/svg/XIcon";
import { selectBoards, selectShowHeaderMenu } from "~/store/selectors";
import {
  toggleDeleteBoardModal,
  toggleEditBoardModal,
  toggleHeaderMenu,
} from "~/store/uiSlice";

type HeaderMenuProps = {
  report?: boolean;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({ report }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const boards = useSelector(selectBoards);
  const showSubmenu = useSelector(selectShowHeaderMenu);

  const submenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const hasBoards = boards && boards.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        submenuRef.current &&
        buttonRef.current &&
        !submenuRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        dispatch(toggleHeaderMenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div
      className="relative z-50 cursor-pointer px-4"
      onClick={() => dispatch(toggleHeaderMenu())}
      data-testid="header-menu-button"
    >
      <div ref={buttonRef}>
        <MenuIcon
          className={`transition ${showSubmenu && "rotate-90"}`}
          data-testid="header-menu-icon"
        />
      </div>
      {showSubmenu && (
        <div
          className="absolute right-0 top-12 flex w-48 flex-col gap-6 rounded-xl bg-white p-4 shadow-xl shadow-gradient dark:bg-zinc lg:right-1"
          ref={submenuRef}
          data-testid="header-menu"
        >
          {!report ? (
            <>
              <span
                className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
                  hasBoards ? null : "hidden"
                }`}
                onClick={() => dispatch(toggleEditBoardModal())}
                data-testid="header-menu-item"
              >
                Edit Board
                <EditIcon className="h-6 w-6 fill-white stroke-slate transition group-hover:stroke-gunmetal-700 dark:fill-transparent dark:group-hover:stroke-white" />
              </span>
              <span
                className={`group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400 ${
                  hasBoards ? null : "hidden"
                }`}
                onClick={() => dispatch(toggleDeleteBoardModal())}
                data-testid="header-menu-item"
              >
                Delete Board
                <XIcon className="h-6 w-6 stroke-red-600 transition group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
              </span>
              <span
                className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
                  hasBoards ? null : "hidden"
                }`}
                onClick={() => router.push("/reports")}
                data-testid="header-menu-item"
              >
                Generate Reports
                <ReportsIcon className="group fill-slate transition group-hover:fill-gunmetal-700 dark:group-hover:fill-white" />
              </span>
            </>
          ) : (
            <span
              className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
                hasBoards ? null : "hidden"
              }`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="header-menu-item"
            >
              Toggle Theme
              {theme === "dark" ? (
                <LightThemeIcon className="fill-slate transition duration-500 group-hover:rotate-180 group-hover:scale-125 group-hover:fill-yellow" />
              ) : (
                <DarkThemeIcon className="fill-slate transition duration-500 group-hover:rotate-[360deg] group-hover:scale-125 group-hover:fill-blue" />
              )}
            </span>
          )}
          <span
            className="group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400"
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
            data-testid="header-menu-item"
          >
            Sign Out
            <SignoutIcon className="h-6 w-6 fill-transparent stroke-red-600 transition group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
          </span>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
