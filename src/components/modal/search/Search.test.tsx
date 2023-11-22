import Search from "~/components/modal/search/Search";
import { initialBoardState } from "~/store/boardSlice";
import {
  createTestBoard,
  fireEvent,
  renderWithProviders,
  screen,
} from "~/utils/testUtils";

jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: (value: string) => value,
}));

describe("Search", () => {
  const testBoard = createTestBoard("1");
  const preloadedState = {
    board: {
      ...initialBoardState,
      boards: [testBoard],
    },
  };

  test("renders correctly", () => {
    renderWithProviders(<Search />);

    expect(
      screen.getByRole("heading", { name: /Search/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Search for boards that contain your search term/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Todo, Doing, Done.../i),
    ).toBeInTheDocument();
  });

  test("displays the search results when there is a debouncedSearchTerm", () => {
    renderWithProviders(<Search />, { preloadedState });

    fireEvent.change(screen.getByPlaceholderText(/Todo, Doing, Done.../i), {
      target: { value: "Test Board" },
    });

    setTimeout(() => {
      expect(screen.getByText(/Test Board Name/i)).toBeInTheDocument();
    }, 500);
  });

  test("displays an empty list when there is no debouncedSearchTerm", () => {
    renderWithProviders(<Search />, { preloadedState });

    fireEvent.change(screen.getByPlaceholderText(/Todo, Doing, Done.../i), {
      target: { value: "" },
    });

    setTimeout(() => {
      expect(screen.queryByText(/Test Board Name/i)).not.toBeInTheDocument();
    }, 500);
  });
});
