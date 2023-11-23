import {
  act,
  fireEvent,
  renderWithProviders,
  waitFor,
} from "~/utils/testUtils";

import NoBoardOrEmptyBoard from "~/components/board/NoBoardOrEmptyBoard";
import { toggleAddBoardModal, toggleEditBoardModal } from "~/store/uiSlice";

describe("NoBoardOrEmptyBoard", () => {
  test("renders the no boards message", () => {
    const { getByText } = renderWithProviders(<NoBoardOrEmptyBoard />);

    const heading = getByText(
      /You haven't created any boards yet. Add one below to get started!/i,
    );

    expect(heading).toBeInTheDocument();
  });

  test('should render "Create New Board" button when there are no boards', () => {
    // Arrange
    const preloadedState = {
      board: {
        boards: [],
        error: null,
        currentBoard: null,
        currentTask: null,
      },
    };

    // Act
    const { getByText } = renderWithProviders(<NoBoardOrEmptyBoard />, {
      preloadedState,
    });

    // Assert
    expect(getByText(/Create New Board/i)).toBeInTheDocument();
  });

  test('should dispatch toggleAddBoardModal action when "Create New Board" button is clicked', async () => {
    // Arrange
    const preloadedState = {
      board: {
        boards: [],
        error: null,
        currentBoard: null,
        currentTask: null,
      },
    };

    const { getByText, dispatch } = renderWithProviders(
      <NoBoardOrEmptyBoard />,
      {
        preloadedState,
      },
    );

    // Act
    act(() => {
      fireEvent.click(getByText(/Create New Board/i));
    });

    // Assert
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(toggleAddBoardModal());
    });
  });

  test('should dispatch toggleEditBoardModal action when "Add New Column" button is clicked', async () => {
    // Arrange
    const preloadedState = {
      board: {
        boards: [
          {
            id: "1",
            userId: "user1",
            name: "Board 1",
            columns: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        error: null,
        currentBoard: {
          id: "1",
          userId: "user1",
          name: "Board 1",
          columns: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        currentTask: null,
      },
    };

    const { getByText, dispatch } = renderWithProviders(
      <NoBoardOrEmptyBoard />,
      {
        preloadedState,
      },
    );

    // Act
    act(() => {
      fireEvent.click(getByText(/Add New Column/i));
    });

    // Assert
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(toggleEditBoardModal());
    });
  });
});
