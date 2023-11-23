import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import AddIcon from "~/components/svg/AddIcon";
import XIcon from "~/components/svg/XIcon";
import Button from "~/components/ui/Button";
import Loader from "~/components/ui/Loader";
import { useHandleError } from "~/hooks/useHandleError";
import { useCreateBoardMutation } from "~/store/api";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleAddBoardModal } from "~/store/uiSlice";
import type { CreateBoardInput } from "~/types";
import { getRandColor } from "~/utils/getRandColor";

const AddBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [createBoard, { isLoading, error }] = useCreateBoardMutation();

  const handleError = useHandleError();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateBoardInput>({
    defaultValues: {
      name: "",
      columns: [{ name: "Todo" }, { name: "Doing" }, { name: "Done" }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = async (data: CreateBoardInput) => {
    // removes columns with no name
    data = {
      ...data,
      columns: data.columns.filter((column) => column.name !== ""),
    };

    // adds random color to each column for ui accent next to column name
    const dataWithColumnColors = {
      ...data,
      columns: data.columns.map((column) => ({
        ...column,
        color: column.color ?? getRandColor(),
      })),
    };

    const newBoard = await createBoard(dataWithColumnColors).unwrap();
    dispatch(toggleAddBoardModal());
    dispatch(setCurrentBoard(newBoard));
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  if (isLoading)
    return <Loader message="Creating Board..." color="#635fc7" size={16} />;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="">Add New Board</h2>
        <span
          className="cursor-pointer"
          onClick={() => dispatch(toggleAddBoardModal())}
        >
          <XIcon className="h-6 w-6 stroke-red-600" />
        </span>
      </div>
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
            <span className="absolute right-4 top-9 text-sm text-red-600">
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
                <Controller
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="e.g. Todo, Doing, Done"
                      className={`border-slate/25 ${
                        errors?.columns?.[index] && "border-red-600"
                      }`}
                    />
                  )}
                  name={`columns.${index}.name`}
                  control={control}
                  rules={{ required: true }}
                  defaultValue={field.id}
                />
                <button type="button" onClick={() => remove(index)}>
                  <XIcon className="h-6 w-6 stroke-red-600" />
                </button>
                {errors?.columns?.[index] && (
                  <span className="absolute right-10 top-3 text-sm text-red-600">
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
        <Button type="submit" wide id="add-board-btn">
          <span>Create New Board</span>
        </Button>
      </form>
    </div>
  );
};

export default AddBoard;
