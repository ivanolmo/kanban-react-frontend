import SearchResultsItem from "~/components/modal/search/SearchResultsItem";
import { setCurrentBoard } from "~/store/boardSlice";
import { toggleSearch } from "~/store/uiSlice";
import {
  createTestBoard,
  fireEvent,
  renderWithProviders,
} from "~/utils/testUtils";

describe("SearchResultsItem", () => {
  const testBoard = createTestBoard("1");
  const result = {
    type: "Board" as "Board" | "Column" | "Task" | "Subtask",
    item: testBoard,
    board: testBoard,
  };

  const searchTerm = "Test Board Name";

  test("renders correctly", () => {
    const { getAllByText } = renderWithProviders(
      <SearchResultsItem result={result} searchTerm={searchTerm} />,
    );

    const matchedElements = getAllByText(/Test Board Name/i);
    expect(matchedElements.length).toBeGreaterThan(0);
  });

  test("dispatches toggleSearch and setCurrentBoard actions when clicked", () => {
    const { getAllByText, dispatch } = renderWithProviders(
      <SearchResultsItem result={result} searchTerm={searchTerm} />,
    );

    const matchedElements = getAllByText(/Board: Test Board Name/i);
    expect(matchedElements.length).toBeGreaterThan(0);

    if (matchedElements[0]) {
      fireEvent.click(matchedElements[0]);

      expect(dispatch).toHaveBeenCalledWith(toggleSearch());
      expect(dispatch).toHaveBeenCalledWith(setCurrentBoard(result.board));
    }
  });
});
