import AddIcon from "~/components/svg/AddIcon";

const AddColumn: React.FC = () => {
  return (
    <div
      className="group mt-10 flex h-[40rem] w-72 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-md bg-indigo shadow-md transition-all hover:scale-105 hover:shadow-xl dark:bg-gunmetal-800"
      onClick={() => console.log("add column")}
    >
      <div className="flex items-center gap-2">
        <AddIcon className="fill-slate transition-all group-hover:rotate-180 group-hover:scale-125" />
        <span className="text-xl font-bold text-slate transition-all group-hover:scale-105">
          New Column
        </span>
      </div>
    </div>
  );
};

export default AddColumn;
