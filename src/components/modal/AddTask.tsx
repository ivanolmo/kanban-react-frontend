import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import AddIcon from "~/components/svg/AddIcon";
import XIcon from "~/components/svg/XIcon";
import Button from "~/components/ui/Button";
import Select from "~/components/ui/Select";
import { useAddTaskMutation } from "~/store/api";
import { toggleAddTaskModal } from "~/store/uiSlice";
import type { CreateTaskInput } from "~/types";

const AddTask: React.FC = () => {
  const [addTask, { isLoading, error, data }] = useAddTaskMutation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    defaultValues: {
      columnId: "",
      task: {
        title: "",
        description: "",
        subtasks: [{ title: "" }, { title: "" }],
      },
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "task.subtasks",
  });

  const onSubmit = async (data: CreateTaskInput) => {
    // remove empty subtasks
    const cleanedData = {
      // @ts-expect-error coming from custom Select component. 'id' does exist
      columnId: data.columnId.id as string,
      task: {
        ...data.task,
        subtasks: data.task.subtasks.filter((subtask) => subtask.title !== ""),
      },
    };

    try {
      await addTask(cleanedData).unwrap();
      dispatch(toggleAddTaskModal());
    } catch (err) {
      console.log("err -> ", err);
    }
  };

  if (error) return <p>Error</p>;

  if (isLoading) return <p>Adding task...</p>;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="">Add New Task</h2>
        <button onClick={() => dispatch(toggleAddTaskModal())}>
          <XIcon className="h-6 w-6 stroke-red-600" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="title"
            className={`text-body-md text-slate dark:text-white ${
              errors.task?.title && "text-red-600"
            }`}
          >
            Title
          </label>
          <input
            {...register("task.title", { required: true })}
            placeholder="e.g. Take coffee break"
            name="task.title"
            className={`border-slate/25 ${
              errors.task?.title && "border-red-600"
            }`}
          />
          {errors.task?.title && errors.task?.title.type === "required" && (
            <span className="absolute right-4 top-8 text-body-lg text-red-600">
              Can&apos;t be empty
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="description"
            className={`text-body-md text-slate dark:text-white ${
              errors.task?.description && "text-red-600"
            }`}
          >
            Description
          </label>
          <textarea
            {...register("task.description", {
              required: true,
            })}
            name="task.description"
            placeholder="e.g. It's always good to take a break. This 15 minute break will rechage the batteries a little."
            className={`border-slate/25 ${
              errors.task?.description && "border-red-600"
            }`}
          ></textarea>
          {errors.task?.description &&
            errors.task?.description.type === "required" && (
              <span className="absolute bottom-2 right-4 text-body-lg text-red-600">
                Can&apos;t be empty
              </span>
            )}
        </div>
        <div className="flex w-full flex-col gap-4">
          <span
            className={`text-body-md text-slate dark:text-white ${
              errors.task?.subtasks && "text-red-600"
            }`}
          >
            Subtasks
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
                      placeholder={
                        index === 0
                          ? "e.g. Make coffee"
                          : index % 2 === 0
                          ? "e.g. Make more coffee!"
                          : "e.g. Drink coffee and feel happy"
                      }
                      className={`border-slate/25 ${
                        errors.task?.subtasks?.[index] && "border-red-600"
                      }`}
                    />
                  )}
                  name={`task.subtasks.${index}.title`}
                  control={control}
                  rules={{ required: true }}
                  defaultValue={field.id}
                />
                <button type="button" onClick={() => remove(index)}>
                  <XIcon className="h-6 w-6 stroke-red-600" />
                </button>
                {errors.task?.subtasks?.[index] && (
                  <span className="absolute right-12 top-2 text-body-lg text-red-600">
                    Can&apos;t be empty
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button variant="secondary" wide onClick={() => append({ title: "" })}>
          <AddIcon className="fill-violet-700" />
          <span>Add New Subtask</span>
        </Button>
        <div className="flex w-full flex-col gap-4">
          <span
            className={`text-body-md text-slate dark:text-white ${
              errors.columnId && "text-red-600"
            }`}
          >
            Status
          </span>
          <Select control={control} name="columnId" />
          <Button type="submit" wide>
            <span>Create Task</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
