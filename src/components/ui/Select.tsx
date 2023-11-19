import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { useSelector } from "react-redux";

import CheckIcon from "~/components/svg/CheckIcon";
import ChevronDownIcon from "~/components/svg/ChevronDownIcon";
import { selectCurrentBoard, selectCurrentTask } from "~/store/selectors";

type SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  disabled?: boolean;
};

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  disabled = false,
}: SelectProps<TFieldValues, TName>): JSX.Element => {
  const currentBoard = useSelector(selectCurrentBoard);
  const currentTask = useSelector(selectCurrentTask);

  const {
    field: { value, onChange },
  } = useController({ name, control });

  // on mount set default select value to todo if new task, or the current column if viewing task
  useEffect(() => {
    if (!currentTask) {
      onChange(currentBoard?.columns[0]);
    } else {
      onChange(
        currentBoard?.columns.find(
          (column) => column.id === currentTask?.columnId,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBoard?.columns, currentTask]);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-md border border-slate/25 px-4 py-2 text-left text-body-lg",
              disabled && "pointer-events-none",
            )}
          >
            <span>{value.name ?? currentBoard?.columns?.[0]?.name}</span>
            <span
              className={clsx(
                "absolute right-4 top-4 cursor-pointer transition",
                open && "rotate-180",
                disabled && "invisible",
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
            <Listbox.Options className="absolute w-full overflow-auto rounded-md bg-white text-body-lg shadow-xl dark:bg-zinc">
              {currentBoard?.columns.map((column) => {
                return (
                  <Listbox.Option
                    key={column.id}
                    className={({ active }) =>
                      clsx(
                        "group relative cursor-pointer px-4 py-2",
                        active ? "bg-violet-700 text-white" : "text-slate",
                        value.id === column.id
                          ? "bg-violet-700 text-white"
                          : "text-slate",
                      )
                    }
                    value={{
                      id: column.id,
                      name: column.name,
                    }}
                  >
                    {() => (
                      <>
                        <span
                          className={clsx(
                            "block",
                            value.id === column.id
                              ? "font-bold"
                              : "font-normal",
                          )}
                        >
                          {column.name}
                        </span>
                        {value.id === column.id && (
                          <span className="absolute right-4 top-4 stroke-white">
                            <CheckIcon />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
