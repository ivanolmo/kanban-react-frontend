import Task from "~/components/task/Task";
import { type Column } from "~/types";

type ColumnProps = {
  column: Column;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div
      className="flex w-72 flex-shrink-0 flex-col gap-6"
      data-testid="column"
    >
      <div className="flex items-center gap-3 uppercase text-slate">
        <span
          className="h-4 w-4 flex-shrink-0 rounded-full"
          style={{ backgroundColor: column.color }}
        ></span>
        <h4>{column.name}</h4>
        <span className="-ml-2 text-body-md tracking-widest">{`(${column.tasks.length})`}</span>
      </div>
      <ul className="space-y-5">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default Column;
