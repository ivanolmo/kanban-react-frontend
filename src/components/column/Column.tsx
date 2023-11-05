import Task from "~/components/task/Task";
import { Column } from "~/types";

type ColumnProps = {
  column: Column;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="flex flex-col flex-shrink-0 gap-6 w-72">
      <div className="flex items-center gap-3 uppercase text-slate">
        <span
          className="flex-shrink-0 w-4 h-4 rounded-full"
          style={{ backgroundColor: column.accentColor }}
        ></span>
        <h4>{column.name}</h4>
        <span className="-ml-2 tracking-widest text-body-md">{`(${column.tasks.length})`}</span>
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
