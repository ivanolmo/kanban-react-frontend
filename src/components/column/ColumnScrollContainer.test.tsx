import { renderWithProviders } from "~/utils/testUtils";
import ColumnScrollContainer from "./ColumnScrollContainer";
import { createTestBoard } from "~/utils/testUtils";

describe("ColumnScrollContainer", () => {
  const testBoard = createTestBoard("1"); // has 2 columns

  test("renders correctly", () => {
    const { container } = renderWithProviders(<ColumnScrollContainer />);

    expect(container.firstChild).toHaveClass("indiana-scroll-container");
  });

  test("has correct classes when sidebar is open", () => {
    const preloadedState = {
      board: {
        boards: [testBoard],
        error: null,
        currentBoard: testBoard,
        currentTask: null,
      },
      ui: {
        showSidebar: true,
        showMobileSidebar: false,
        showHeaderMenu: false,
        showViewTaskSubmenu: false,
        showAddBoardModal: false,
        showEditBoardModal: false,
        showDeleteBoardModal: false,
        showViewTaskModal: false,
        showAddTaskModal: false,
        showEditTaskModal: false,
        showDeleteTaskModal: false,
        showErrorModal: false,
        errorMessage: null,
        showSearch: false,
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
        boards: [testBoard],
        error: null,
        currentBoard: testBoard,
        currentTask: null,
      },
    };

    const { getAllByTestId } = renderWithProviders(<ColumnScrollContainer />, {
      preloadedState,
    });

    expect(getAllByTestId("column").length).toBe(2);
  });
});
