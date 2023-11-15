import { useDispatch } from "react-redux";

import BoardIcon from "~/components/svg/BoardIcon";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleSearch } from "~/store/uiSlice";
import type { Board } from "~/types";

type SearchResultsItemProps = {
  result: Board;
  searchTerm: string;
};

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({
  result,
  searchTerm,
}) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(toggleSearch());
    dispatch(setCurrentBoard(result));
  };

  const getSearchContext = () => {
    for (const column of result.columns) {
      if (column.name.includes(searchTerm)) {
        return { location: `Column: ${column.name}`, preview: column.name };
      }

      for (const task of column.tasks) {
        if (
          task.title.includes(searchTerm) ||
          task.description.includes(searchTerm)
        ) {
          return {
            location: `Task: '${task.title}' in Column: '${column.name}'`,
            preview: task.description.substring(0, 40) + "...",
          };
        }

        for (const subtask of task.subtasks) {
          if (subtask.title.includes(searchTerm)) {
            return {
              location: `Subtask: '${subtask.title}' in Task: '${task.title}'`,
              preview: subtask.title,
            };
          }
        }
      }
    }
    return { location: "", preview: "" };
  };

  const { location, preview } = getSearchContext();

  return (
    <li
      className="flex cursor-pointer flex-col gap-2 space-y-2 rounded-lg bg-white px-6 py-4 shadow-md shadow-slate transition-all duration-150 hover:scale-105 dark:bg-gunmetal-800 dark:shadow-zinc dark:hover:bg-gunmetal-700"
      onClick={() => handleSelect()}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Board: {result?.name}</span>
        <BoardIcon className="dark:fill-white" />
      </div>
      {location && (
        <p className="flex flex-col">
          <span className="font-bold">Matched in: </span>
          <span>{location}</span>
        </p>
      )}
      {preview && (
        <p className="flex flex-col">
          <span className="font-bold">Preview: </span>
          <span>{preview}</span>
        </p>
      )}
    </li>
  );
};

export default SearchResultsItem;
