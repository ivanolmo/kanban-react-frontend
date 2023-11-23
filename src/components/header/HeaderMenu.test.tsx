import HeaderMenu from "~/components/header/HeaderMenu";
import { initialBoardState } from "~/store/boardSlice";
import { initialUIState } from "~/store/uiSlice";
import {
  createTestBoard,
  renderWithProviders,
  screen,
} from "~/utils/testUtils";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("HeaderMenu", () => {
  const testBoard = createTestBoard("1");

  test("renders the header menu button and icon", () => {
    renderWithProviders(<HeaderMenu />);

    const headerMenu = screen.getByTestId("header-menu-button");
    const menuIcon = screen.getByTestId("header-menu-icon");
    expect(headerMenu).toBeInTheDocument();
    expect(menuIcon).toBeInTheDocument();
  });

  test("does not render the header menu when 'sidebarVisible' is false", () => {
    renderWithProviders(<HeaderMenu />);

    const headerMenu = screen.queryByTestId("header-menu");
    expect(headerMenu).not.toBeInTheDocument();
  });

  test("renders the header menu when 'sidebarVisible' is true", () => {
    const preloadedState = {
      ui: {
        ...initialUIState,
        showHeaderMenu: true,
      },
    };

    renderWithProviders(<HeaderMenu />, { preloadedState });

    const headerMenu = screen.getByTestId("header-menu");
    expect(headerMenu).toBeInTheDocument();
  });

  test("renders the header menu with 4 items when 'report' is false and there are boards", () => {
    const preloadedState = {
      ui: {
        ...initialUIState,
        showHeaderMenu: true,
      },
      board: {
        ...initialBoardState,
        boards: [testBoard],
        currentBoard: testBoard,
      },
    };

    renderWithProviders(<HeaderMenu />, { preloadedState });

    const headerMenuItems = screen.getAllByTestId("header-menu-item");
    expect(headerMenuItems).toHaveLength(4);
  });

  test("renders the header menu with 2 items when 'report' is true and there are boards", () => {
    const preloadedState = {
      ui: {
        ...initialUIState,
        showHeaderMenu: true,
      },
      board: {
        ...initialBoardState,
        boards: [testBoard],
        currentBoard: testBoard,
      },
    };

    renderWithProviders(<HeaderMenu report />, { preloadedState });

    const headerMenuItems = screen.getAllByTestId("header-menu-item");
    expect(headerMenuItems).toHaveLength(2);
  });
});
