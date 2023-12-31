import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "~/components/svg/AddIcon";
import XIcon from "~/components/svg/XIcon";
import Button from "~/components/ui/Button";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useEditBoardMutation } from "~/store/api";
import { selectCurrentBoard } from "~/store/selectors";
import { toggleEditBoardModal } from "~/store/uiSlice";
import type { EditBoardInput } from "~/types";
import { getRandColor } from "~/utils/getRandColor";

const EditBoard: React.FC = () => {
  const [columnsToDelete, setColumnsToDelete] = useState<string[]>([]);

  const dispatch = useDispatch();
  const [editBoard, { isLoading, error }] = useEditBoardMutation();
  const currentBoard = useSelector(selectCurrentBoard);

  const handleError = useHandleError();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EditBoardInput>({
    defaultValues: {
      id: currentBoard?.id,
      name: currentBoard?.name,
      columns: currentBoard?.columns,
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = async (data: EditBoardInput) => {
    // adds random color to each column for ui accent next to column name
    const dataWithColumnColors = {
      ...data,
      columns: data.columns.map((column) => ({
        ...column,
        color: column.color ?? getRandColor(),
      })),
    };

    await editBoard(dataWithColumnColors).unwrap();
    dispatch(toggleEditBoardModal());
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  if (isLoading)
    return <Loader message="Updating Board..." color="#635fc7" size={16} />;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="">Edit Board</h2>
        <button onClick={() => dispatch(toggleEditBoardModal())}>
          <XIcon className="h-6 w-6 stroke-red-600" />
        </button>
      </div>
      {columnsToDelete.length > 0 && (
        <div className="space-y-4 text-body-lg text-red-600">
          <span>
            <span className="uppercase">Warning!</span> This action will delete
            the following column{columnsToDelete.length > 1 && "s"} and all
            associated tasks:
          </span>
          <ul>
            {columnsToDelete.map((column) => (
              <li key={column}>{column}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="name"
            className={`text-body-md text-slate dark:text-white ${
              errors.name && "text-red-600"
            }`}
          >
            Board Name
          </label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="e.g. Web Design"
            name="name"
            maxLength={20}
            className={`border-slate/25 ${errors?.name && "border-red-600"}`}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-body-sm absolute right-4 top-10 text-red-600">
              Can&apos;t be empty
            </span>
          )}
        </div>
        <div className="flex w-full flex-col gap-4">
          <span
            className={`text-body-md text-slate dark:text-white ${
              errors?.columns && "text-red-600"
            }`}
          >
            Board Columns
          </span>
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="relative flex w-full items-center gap-2"
              >
                <input
                  key={field.id}
                  {...register(`columns.${index}.name`, {
                    required: true,
                  })}
                  placeholder="e.g. Todo, Doing, Done"
                  className={`border-slate/25 ${
                    errors?.columns?.[index] && "border-red-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                    setColumnsToDelete((columns) => [...columns, field.name]);
                  }}
                >
                  <XIcon className="h-6 w-6 stroke-red-600" />
                </button>
                {errors?.columns?.[index] && (
                  <span className="absolute right-10 top-3.5 text-sm text-red-600">
                    Can&apos;t be empty
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button
          variant="secondary"
          wide
          onClick={() => append({ name: "", color: getRandColor() })}
        >
          <AddIcon className="fill-violet-700" />
          <span>Add New Column</span>
        </Button>
        <Button type="submit" wide>
          <span>Save Changes</span>
        </Button>
      </form>
    </div>
  );
};

export default EditBoard;
