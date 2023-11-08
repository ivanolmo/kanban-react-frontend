import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useCreateBoardMutation } from "~/store/api";
import XIcon from "~/components/svg/XIcon";
import Button from "~/components/ui/Button";
import AddIcon from "~/components/svg/AddIcon";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleAddBoardModal } from "~/store/uiSlice";

export type CreateBoardInput = {
  name: string;
  columns: { name: string }[];
};

const AddBoard = () => {
  const [createBoard, { isLoading, error, data }] = useCreateBoardMutation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateBoardInput>({
    defaultValues: {
      name: "",
      columns: [{ name: "Todo" }, { name: "Doing" }],
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

    try {
      const newBoard = await createBoard(data).unwrap();
      dispatch(toggleAddBoardModal());
      dispatch(setCurrentBoard(newBoard));
    } catch (err) {
      console.log("err -> ", err);
    }
  };

  if (error) return <p>error</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="">Add New Board</h2>
        <span
          className="cursor-pointer"
          onClick={() => dispatch({ type: "ui/toggleAddBoardModal" })}
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
                  // rules={{ required: true }}
                  defaultValue={field.id}
                />
                <button type="button" onClick={() => remove(index)}>
                  <XIcon className="h-6 w-6 stroke-red-600" />
                </button>
                {errors?.columns?.[index] && (
                  <span className="text-body-sm absolute right-10 top-4 text-red-600">
                    Can&apos;t be empty
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button variant="secondary" wide onClick={() => append({ name: "" })}>
          <AddIcon className="fill-violet-700" />
          <span>Add New Column</span>
        </Button>
        <Button type="submit" wide>
          <span>Create New Board</span>
        </Button>
      </form>
    </div>
  );
};

export default AddBoard;
