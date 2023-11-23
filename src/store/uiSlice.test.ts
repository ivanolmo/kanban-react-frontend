import uiSlice, {
  clearError,
  initialUIState,
  resetModals,
  setError,
  toggleAddBoardModal,
  toggleAddTaskModal,
  toggleDeleteBoardModal,
  toggleDeleteTaskModal,
  toggleEditBoardModal,
  toggleEditTaskModal,
  toggleErrorModal,
  toggleHeaderMenu,
  toggleMobileSidebar,
  toggleSearch,
  toggleSidebar,
  toggleViewTaskModal,
  toggleViewTaskSubmenu,
} from "~/store/uiSlice";

describe("uiSlice", () => {
  test("should return the initial state", () => {
    expect(uiSlice(undefined, { type: undefined })).toEqual(initialUIState);
  });

  test("should handle toggleSidebar", () => {
    expect(uiSlice(initialUIState, toggleSidebar())).toEqual({
      ...initialUIState,
      showSidebar: true,
    });
  });

  test("should handle toggleMobileSidebar", () => {
    expect(uiSlice(initialUIState, toggleMobileSidebar())).toEqual({
      ...initialUIState,
      showMobileSidebar: true,
    });
  });

  test("should handle toggleHeaderMenu", () => {
    expect(uiSlice(initialUIState, toggleHeaderMenu())).toEqual({
      ...initialUIState,
      showHeaderMenu: true,
    });
  });

  test("should handle toggleViewTaskSubmenu", () => {
    expect(uiSlice(initialUIState, toggleViewTaskSubmenu())).toEqual({
      ...initialUIState,
      showViewTaskSubmenu: true,
    });
  });

  test("should handle toggleAddBoardModal", () => {
    expect(uiSlice(initialUIState, toggleAddBoardModal())).toEqual({
      ...initialUIState,
      showAddBoardModal: true,
    });
  });

  test("should handle toggleEditBoardModal", () => {
    expect(uiSlice(initialUIState, toggleEditBoardModal())).toEqual({
      ...initialUIState,
      showEditBoardModal: true,
    });
  });

  test("should handle toggleDeleteBoardModal", () => {
    expect(uiSlice(initialUIState, toggleDeleteBoardModal())).toEqual({
      ...initialUIState,
      showDeleteBoardModal: true,
    });
  });

  test("should handle toggleViewTaskModal", () => {
    expect(uiSlice(initialUIState, toggleViewTaskModal())).toEqual({
      ...initialUIState,
      showViewTaskModal: true,
    });
  });

  test("should handle toggleAddTaskModal", () => {
    expect(uiSlice(initialUIState, toggleAddTaskModal())).toEqual({
      ...initialUIState,
      showAddTaskModal: true,
    });
  });

  test("should handle toggleEditTaskModal", () => {
    expect(uiSlice(initialUIState, toggleEditTaskModal())).toEqual({
      ...initialUIState,
      showEditTaskModal: true,
    });
  });

  test("should handle toggleDeleteTaskModal", () => {
    expect(uiSlice(initialUIState, toggleDeleteTaskModal())).toEqual({
      ...initialUIState,
      showDeleteTaskModal: true,
    });
  });

  test("should handle toggleErrorModal", () => {
    expect(uiSlice(initialUIState, toggleErrorModal())).toEqual({
      ...initialUIState,
      showErrorModal: true,
    });
  });

  test("should handle toggleSearch", () => {
    expect(uiSlice(initialUIState, toggleSearch())).toEqual({
      ...initialUIState,
      showSearch: true,
    });
  });

  test("should handle setError", () => {
    const errorMessage = "An error occurred";
    expect(uiSlice(initialUIState, setError(errorMessage))).toEqual({
      ...initialUIState,
      showErrorModal: true,
      errorMessage,
    });
  });

  test("should handle clearError", () => {
    const stateWithError = {
      ...initialUIState,
      showErrorModal: true,
      errorMessage: "An error occurred",
    };
    expect(uiSlice(stateWithError, clearError())).toEqual({
      ...initialUIState,
      showErrorModal: false,
      errorMessage: null,
    });
  });

  test("should handle resetModals", () => {
    const stateWithModals = {
      ...initialUIState,
      showAddBoardModal: true,
      showEditBoardModal: true,
    };
    expect(uiSlice(stateWithModals, resetModals())).toEqual(initialUIState);
  });
});
