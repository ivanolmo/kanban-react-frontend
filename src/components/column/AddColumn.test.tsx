import {
  act,
  fireEvent,
  renderWithProviders,
  waitFor,
} from "~/utils/testUtils";

import AddColumn from "~/components/column/AddColumn";
import { toggleEditBoardModal } from "~/store/uiSlice";

describe("AddColumn", () => {
  test("renders the add column component", () => {
    const { getByText } = renderWithProviders(<AddColumn />);

    const heading = getByText(/New Column/i);

    expect(heading).toBeInTheDocument();
  });

  test('should dispatch toggleEditBoardModal action when "New Column" button is clicked', async () => {
    // Arrange
    const { getByText, dispatch } = renderWithProviders(<AddColumn />);

    // Act
    act(() => {
      fireEvent.click(getByText(/New Column/i));
    });

    // Assert
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(toggleEditBoardModal());
    });
  });
});
