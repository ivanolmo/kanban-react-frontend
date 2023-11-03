import Task from "~/components/task/Task";
import { type Column } from "~/types";

type ColumnProps = {
  column: Column;
};

export default function Column(props: ColumnProps): JSX.Element {
  return (
    <div className="flex flex-col flex-shrink-0 gap-6 w-72">
      <div className="flex items-center gap-3 uppercase text-slate">
        <span
          className="flex-shrink-0 w-4 h-4 rounded-full"
          style={{ backgroundColor: props.column.accentColor }}
        ></span>
        <h4>{props.column.name}</h4>
        <span className="-ml-2 tracking-widest text-body-md">{`(${props.column.tasks.length})`}</span>
      </div>
      <ul className="space-y-5">
        {props.column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
