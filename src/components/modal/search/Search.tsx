import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchResultsItem from "~/components/modal/search/SearchResultsItem";
import XIcon from "~/components/svg/XIcon";
import { selectBoards } from "~/store/selectors";
import { toggleSearch } from "~/store/uiSlice";
import type { Board } from "~/types";
import { searchBoards } from "~/utils/searchBoards";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Board[]>([]);

  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const searchResults = debouncedSearchTerm
      ? searchBoards(boards, debouncedSearchTerm)
      : [];
    setResults(searchResults);
  }, [debouncedSearchTerm, boards]);

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <h2>Search</h2>
        <span
          className="cursor-pointer"
          onClick={() => dispatch(toggleSearch())}
        >
          <XIcon className="h-6 w-6 stroke-red-600" />
        </span>
      </div>
      <p className="text-md">
        Search for boards that contain your search term:
      </p>
      <div className="w-full space-y-6">
        <input
          placeholder="Todo, doing, done..."
          className="border-slate/25"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul className="space-y-6">
          {results.map((result) => (
            <SearchResultsItem
              key={result.id}
              result={result}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
