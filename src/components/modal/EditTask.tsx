import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "~/components/svg/AddIcon";
import XIcon from "~/components/svg/XIcon";
import Button from "~/components/ui/Button";
import Loader from "~/components/ui/Loader";
import Select from "~/components/ui/Select";
import { useHandleError } from "~/hooks/useHandleError";
import { useEditTaskMutation } from "~/store/api";
import { clearCurrentTask } from "~/store/boardSlice";
import { selectCurrentTask } from "~/store/selectors";
import { toggleEditTaskModal } from "~/store/uiSlice";
import type { EditTaskInput, EditTaskRequest } from "~/types";

const EditTask: React.FC = () => {
  const dispatch = useDispatch();
  const [editTask, { isLoading, error }] = useEditTaskMutation();
  const currentTask = useSelector(selectCurrentTask);

  const handleError = useHandleError();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<EditTaskInput>({
    defaultValues: {
      id: currentTask?.id,
      columnId: currentTask?.columnId,
      task: {
        title: currentTask?.title,
        description: currentTask?.description,
        subtasks: currentTask?.subtasks,
      },
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "task.subtasks",
  });

  const onSubmit = async (data: EditTaskInput) => {
    let columnId;

    // type guard for columnId needed because of custom Select component
    if (typeof data.columnId === "string") {
      columnId = data.columnId;
    } else {
      // @ts-expect-error coming from custom Select component. id does exist
      columnId = data.columnId.id as string;
    }

    const uniqueSubtasks = data.task.subtasks.filter(
      (subtask, index, self) =>
        index === self.findIndex((t) => t.title === subtask.title),
    );

    const cleanedData: EditTaskRequest = {
      id: data.id,
      task: {
        ...data.task,
        subtasks: uniqueSubtasks,
        columnId,
      },
    };

    await editTask(cleanedData).unwrap();
    dispatch(toggleEditTaskModal());
  };

  const handleClose = () => {
    dispatch(toggleEditTaskModal());
    dispatch(clearCurrentTask());
  };

  useEffect(() => {
    reset({
      id: currentTask?.id,
      task: {
        title: currentTask?.title,
        description: currentTask?.description,
        subtasks: currentTask?.subtasks,
      },
    });
  }, [reset, currentTask]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [dispatch, error, handleError]);

  if (isLoading)
    return <Loader message="Updating Task..." color="#635fc7" size={16} />;

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="">Edit Task</h2>
        <button onClick={() => handleClose()}>
          <XIcon className="h-6 w-6 stroke-red-600" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="task.title"
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
            htmlFor="task.description"
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
          <span className="text-body-md text-slate dark:text-white">
            Status
          </span>
          <Select control={control} name="columnId" />
          <Button type="submit" wide>
            <span>Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
