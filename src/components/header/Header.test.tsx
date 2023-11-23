/* eslint-disable @typescript-eslint/no-unsafe-return */
import Header from "~/components/header/Header";
import {
  createTestBoard,
  renderWithProviders,
  screen,
} from "~/utils/testUtils";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const useGetBoardsQueryMock = jest.fn().mockReturnValue({
  isLoading: false,
});

jest.mock("~/store/api/", () => {
  return {
    ...jest.requireActual("~/store/api/"),
    useGetBoardsQuery: () => useGetBoardsQueryMock(),
  };
});

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testBoard = createTestBoard("1"); // has 2 columns

  test("renders loader when loading boards", () => {
    useGetBoardsQueryMock.mockReturnValueOnce({ isLoading: true });

    renderWithProviders(<Header />);

    const loaderElement = screen.getByTestId("header-loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test("renders header with board name", () => {
    const preloadedState = {
      board: {
        boards: [],
        error: null,
        currentBoard: testBoard,
        currentTask: null,
      },
    };
    useGetBoardsQueryMock.mockReturnValueOnce({ isLoading: false });

    renderWithProviders(<Header />, { preloadedState });

    const headerElement = screen.getByRole("heading", {
      name: /Test Board Name/i,
      level: 1,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test("renders header with 'No Boards' when there are no boards", () => {
    const preloadedState = {
      board: {
        boards: [],
        error: null,
        currentBoard: null,
        currentTask: null,
      },
    };

    renderWithProviders(<Header />, { preloadedState });

    const headerElement = screen.getByRole("heading", {
      name: /No Boards/i,
      level: 1,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test("renders header with search button", () => {
    renderWithProviders(<Header />);

    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test("renders header with add new task button", () => {
    renderWithProviders(<Header />);

    const addTaskButton = screen.getByRole("button", { name: /Add New Task/i });
    expect(addTaskButton).toBeInTheDocument();
  });

  test("renders header with 'No Board Report Generated' when report is true", () => {
    renderWithProviders(<Header report />);

    const headerElement = screen.getByRole("heading", {
      name: /No Board Report Generated/i,
      level: 1,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test("renders header with back to boards button when report is true", () => {
    renderWithProviders(<Header report />);

    const backToBoardsButton = screen.getByRole("button", {
      name: /Back To Boards/i,
    });
    expect(backToBoardsButton).toBeInTheDocument();
  });
});
