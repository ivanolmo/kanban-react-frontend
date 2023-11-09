import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CheckIcon from "~/components/svg/CheckIcon";
import ChevronDownIcon from "~/components/svg/ChevronDownIcon";
import {
  selectCurrentBoard,
  selectCurrentTask,
  selectShowEditTaskModal,
} from "~/store/selectors";
import { toggleEditTaskModal } from "~/store/uiSlice";

type SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  handleColumnMove?: (columnId: string, taskId: string) => void;
};

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: SelectProps<TFieldValues, TName>,
): JSX.Element => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);
  const currentTask = useSelector(selectCurrentTask);
  const showEditTaskModal = useSelector(selectShowEditTaskModal);

  const {
    field: { value, onChange },
  } = useController(props);

  const { handleColumnMove } = props;

  // on mount set default select value to todo if new task, or current column if viewing task
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

  // this fires if existing task and user changes column
  useEffect(() => {
    if (
      currentTask &&
      !showEditTaskModal &&
      Object.keys(value).length &&
      value.id !== currentTask?.columnId
    ) {
      handleColumnMove && handleColumnMove(value.id as string, currentTask?.id);
      dispatch(toggleEditTaskModal());
    }
  }, [currentTask, dispatch, handleColumnMove, showEditTaskModal, value]);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-slate/25 px-4 py-2 text-left text-body-lg">
            <span>{value.name ?? currentBoard?.columns[0]?.name}</span>
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
            leave="transition ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
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
