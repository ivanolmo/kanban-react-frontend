import { useDispatch } from "react-redux";

import BoardIcon from "~/components/svg/BoardIcon";
import ColumnIcon from "~/components/svg/ColumnIcon";
import SubtaskIcon from "~/components/svg/SubtaskIcon";
import TaskIcon from "~/components/svg/TaskIcon";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleSearch } from "~/store/uiSlice";
import { getSearchContext } from "~/utils/getSearchContext";
import type { SearchResult } from "~/types";

type SearchResultsItemProps = {
  result: SearchResult;
  searchTerm: string;
};

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({
  result,
  searchTerm,
}) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(toggleSearch());
    dispatch(setCurrentBoard(result.board));
  };

  const { location, preview } = getSearchContext(result, searchTerm);

  return (
    <li
      className="flex cursor-pointer flex-col gap-2 space-y-2 rounded-lg bg-white px-6 py-4 shadow-md shadow-slate transition-all duration-150 hover:scale-105 dark:bg-gunmetal-800 dark:shadow-zinc dark:hover:bg-gunmetal-700"
      onClick={() => handleSelect()}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{`${result.type}: ${
          "name" in result.item ? result.item.name : result.item.title
        }`}</span>
        {result.type === "Board" && <BoardIcon className="dark:fill-white" />}
        {result.type === "Column" && <ColumnIcon className="dark:text-white" />}
        {result.type === "Task" && <TaskIcon className="dark:text-white" />}
        {result.type === "Subtask" && (
          <SubtaskIcon className="dark:fill-white" />
        )}
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
