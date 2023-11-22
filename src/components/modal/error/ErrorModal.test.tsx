import { clearError, initialUIState } from "~/store/uiSlice";
import {
  act,
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "~/utils/testUtils";

import ErrorModal from "~/components/modal/error/ErrorModal";

describe("ErrorModal", () => {
  test("modal renders correctly", () => {
    const { getByText } = renderWithProviders(<ErrorModal />);

    expect(getByText("Something went wrong")).toBeInTheDocument();
    expect(getByText("OK")).toBeInTheDocument();
  });

  test("displays the error message from the Redux store", () => {
    const preloadedState = {
      ui: {
        ...initialUIState,
        errorMessage: "Test error message",
      },
    };

    renderWithProviders(<ErrorModal />, { preloadedState });

    expect(
      screen.getByText("Test error message! Please try again."),
    ).toBeInTheDocument();
  });

  test("dispatches clearError action when OK button is clicked", async () => {
    const preloadedState = {
      ui: {
        ...initialUIState,
        errorMessage: "Test error message",
      },
    };

    const { getByText, dispatch } = renderWithProviders(<ErrorModal />, {
      preloadedState,
    });

    act(() => {
      fireEvent.click(getByText(/Ok/i));
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(clearError());
    });
  });
});
