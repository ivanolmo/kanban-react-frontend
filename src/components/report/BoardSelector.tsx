import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";

import CheckIcon from "~/components/svg/CheckIcon";
import ChevronDownIcon from "~/components/svg/ChevronDownIcon";
import { useGetBoardsQuery } from "~/store/api";
import type { Board } from "~/types";

type BoardSelectorProps = {
  onBoardSelect: (boardId: string) => void;
};

const BoardSelector: React.FC<BoardSelectorProps> = ({ onBoardSelect }) => {
  const { data: boards } = useGetBoardsQuery();
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const handleSelect = (board: Board) => {
    setSelectedBoard(board);
    onBoardSelect(board.id);
  };

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <Listbox value={selectedBoard} onChange={handleSelect}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-slate/25 px-4 py-2 text-left text-body-lg">
              <span>{selectedBoard?.name ?? "Select a board"}</span>
              <span
                className={clsx(
                  "absolute right-4 top-4 cursor-pointer transition",
                  open && "rotate-180",
                )}
              >
                <ChevronDownIcon className="stroke-violet-700" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 -translate-y-10"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 -translate-y-10"
            >
              <Listbox.Options className="absolute z-50 w-full overflow-auto rounded-md bg-white text-body-lg shadow-xl dark:bg-zinc">
                {boards?.map((board) => (
                  <Listbox.Option
                    key={board.id}
                    className={({ active }) =>
                      clsx(
                        "group relative cursor-pointer px-4 py-2",
                        active ? "bg-violet-700 text-white" : "text-slate",
                        selectedBoard?.id === board.id
                          ? "bg-violet-700 text-white"
                          : "text-slate",
                      )
                    }
                    value={board}
                  >
                    {() => (
                      <>
                        <span
                          className={clsx(
                            "block",
                            selectedBoard?.id === board.id
                              ? "font-bold"
                              : "font-normal",
                          )}
                        >
                          {board.name}
                        </span>
                        {selectedBoard?.id === board.id && (
                          <span className="absolute right-4 top-4 stroke-white">
                            <CheckIcon />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default BoardSelector;
