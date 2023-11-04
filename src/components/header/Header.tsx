import { useState } from "react";

import { AddIcon } from "~/assets/AddIcon";
import { Logo } from "~/assets/Logo";
import Button from "~/components/ui/Button";
import Submenu from "~/components/ui/Submenu";
import { type Board } from "~/types";

type HeaderProps = {
  boards: Board[] | undefined;
  sidebarVisible?: boolean;
};

export default function Header(props: HeaderProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="flex items-center h-16 bg-white dark:bg-gunmetal-800 md:h-20 lg:h-24">
      <div
        className={`border-indigo dark:border-gunmetal-700 hidden h-full items-center border-r px-4 md:flex md:px-6 ${
          props.sidebarVisible && "w-64"
        }`}
      >
        <span className="dark:hidden">
          <Logo className="hidden md:block" />
        </span>
        <span className="hidden dark:inline">
          <Logo className="hidden md:block" dark />
        </span>
      </div>
      <div className="flex items-center justify-between flex-1 w-full pl-4 md:pl-6 md:pr-2">
        {/* <SidebarMobile
          // TODO only needs names not all board data?
          boards={props.boards}
        /> */}
        <h1 className="hidden capitalize md:block">
          {/* {store.selectedBoard?.name ?? 'No Boards'} */}
        </h1>
        <div className="flex items-center gap-1 md:gap-2.5">
          <div>
            <Button
              variant="primary"
              size="lg"
              // disabled={!store.selectedBoard?.columns.length}
              // onClick={() => store.toggleAddTaskModal()}
            >
              <AddIcon className="fill-white" />
              <span className="hidden md:inline">Add New Task</span>
            </Button>
          </div>
          <Submenu
            boards={props.boards}
            showMenu={showMenu}
            // handleDelete={handleDelete}
            // handleEdit={handleEdit}
            toggleMenu={toggleMenu}
            withSignOut
          />
        </div>
      </div>
    </header>
  );
}
