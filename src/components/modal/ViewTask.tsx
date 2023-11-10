import { useDispatch, useSelector } from "react-redux";

import Subtask from "~/components/subtask/Subtask";
import XIcon from "~/components/svg/XIcon";
import ViewTaskSubmenu from "~/components/task/ViewTaskSubmenu";
import { clearCurrentTask } from "~/store/boardSlice";
import { selectCurrentBoard, selectCurrentTask } from "~/store/selectors";
import { toggleViewTaskModal } from "~/store/uiSlice";

const ViewTask: React.FC = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);
  const currentTask = useSelector(selectCurrentTask);

  const columnName = currentBoard?.columns.find(
    (column) => column.id === currentTask?.columnId,
  )?.name;

  const completedSubtaskCount = currentTask?.subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  const handleClose = () => {
    dispatch(toggleViewTaskModal());
    dispatch(clearCurrentTask());
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="">{currentTask?.title}</h2>
        <div className="flex items-center gap-2">
          <ViewTaskSubmenu />
          <button onClick={() => handleClose()}>
            <XIcon className="h-6 w-6 stroke-red-600" />
          </button>
        </div>
      </div>
      <div className="w-full space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-lg text-slate">{currentTask?.description}</p>
        </div>

        <div className="relative flex flex-col gap-2">
          <span className="text-body-md text-slate">{`Subtasks (${completedSubtaskCount} of ${currentTask?.subtasks?.length})`}</span>
        </div>

        <ul className="flex w-full flex-col gap-4">
          {currentTask?.subtasks?.map((subtask) => (
            <Subtask key={subtask.id} subtask={subtask} />
          ))}
        </ul>
        <div className="flex w-full flex-col gap-4">
          <span className="text-body-md text-slate">Current Status</span>
          <input type="text" value={columnName} disabled />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
