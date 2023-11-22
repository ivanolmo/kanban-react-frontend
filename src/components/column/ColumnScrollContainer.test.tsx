import ColumnScrollContainer from "~/components/column/ColumnScrollContainer";
import { initialBoardState } from "~/store/boardSlice";
import { initialUIState } from "~/store/uiSlice";
import { createTestBoard, renderWithProviders } from "~/utils/testUtils";

describe("ColumnScrollContainer", () => {
  const testBoard = createTestBoard("1"); // has 2 columns

  test("renders correctly", () => {
    const { container } = renderWithProviders(<ColumnScrollContainer />);

    expect(container.firstChild).toHaveClass("indiana-scroll-container");
  });

  test("has correct classes when sidebar is open", () => {
    const preloadedState = {
      board: {
        ...initialBoardState,
        boards: [testBoard],
        currentBoard: testBoard,
      },
      ui: {
        ...initialUIState,
        showSidebar: true,
      },
    };

    const { container } = renderWithProviders(<ColumnScrollContainer />, {
      preloadedState,
    });

    expect(container.firstChild).toHaveClass("ml-64");
  });

  test("renders the correct number of Column components", () => {
    const preloadedState = {
      board: {
        ...initialBoardState,
        boards: [testBoard],
        currentBoard: testBoard,
      },
    };

    const { getAllByTestId } = renderWithProviders(<ColumnScrollContainer />, {
      preloadedState,
    });

    expect(getAllByTestId("column").length).toBe(2);
  });
});
