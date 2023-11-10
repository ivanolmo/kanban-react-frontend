import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "~/components/svg/EditIcon";
import MenuIcon from "~/components/svg/MenuIcon";
import XIcon from "~/components/svg/XIcon";
import {
  toggleDeleteTaskModal,
  toggleEditTaskModal,
  toggleViewTaskModal,
  toggleViewTaskSubmenu,
} from "~/store/uiSlice";
import { selectBoards, selectShowViewTaskSubmenu } from "~/store/selectors";

const ViewTaskSubmenu: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const showViewTaskSubmenu = useSelector(selectShowViewTaskSubmenu);

  const submenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleDelete = () => {
    dispatch(toggleViewTaskModal());
    dispatch(toggleDeleteTaskModal());
  };

  const handleEdit = () => {
    dispatch(toggleViewTaskModal());
    dispatch(toggleEditTaskModal());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        submenuRef.current &&
        buttonRef.current &&
        !submenuRef.current.contains(e.target as Node) &&
        !buttonRef?.current?.contains(e.target as Node)
      ) {
        dispatch(toggleViewTaskSubmenu());
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
      onClick={() => dispatch(toggleViewTaskSubmenu())}
    >
      <div ref={buttonRef}>
        <MenuIcon
          className={`transition ${showViewTaskSubmenu && "rotate-90"}`}
        />
      </div>
      {showViewTaskSubmenu && (
        <div
          className="shadow-x absolute right-0 top-6 flex w-48 flex-col gap-6 rounded-xl bg-white p-4 dark:bg-zinc"
          ref={submenuRef}
        >
          <span
            className={`group flex cursor-pointer items-center justify-between text-slate transition hover:text-gunmetal-700 dark:hover:text-white ${
              boards ? !boards?.length && "hidden" : null
            }`}
            onClick={() => handleEdit()}
          >
            Edit Task
            <EditIcon className="h-6 w-6 fill-white stroke-slate transition group-hover:stroke-gunmetal-700 dark:fill-transparent dark:group-hover:stroke-white" />
          </span>
          <span
            className={`group flex cursor-pointer items-center justify-between text-red-600 transition hover:text-red-900 dark:hover:text-red-400 ${
              boards ? !boards?.length && "hidden" : null
            }`}
            onClick={() => handleDelete()}
          >
            Delete Task
            <XIcon className="h-6 w-6 stroke-red-600 transition group-hover:stroke-red-900 dark:group-hover:stroke-red-400" />
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewTaskSubmenu;
