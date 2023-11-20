import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  showSidebar: boolean;
  showMobileSidebar: boolean;
  showHeaderMenu: boolean;
  showViewTaskSubmenu: boolean;
  showAddBoardModal: boolean;
  showEditBoardModal: boolean;
  showDeleteBoardModal: boolean;
  showViewTaskModal: boolean;
  showAddTaskModal: boolean;
  showEditTaskModal: boolean;
  showDeleteTaskModal: boolean;
  showErrorModal: boolean;
  errorMessage: string | null;
  showSearch: boolean;
};

const initialState: UIState = {
  showSidebar: false,
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
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    toggleMobileSidebar(state) {
      state.showMobileSidebar = !state.showMobileSidebar;
    },
    toggleHeaderMenu(state) {
      state.showHeaderMenu = !state.showHeaderMenu;
    },
    toggleViewTaskSubmenu(state) {
      state.showViewTaskSubmenu = !state.showViewTaskSubmenu;
    },
    toggleAddBoardModal(state) {
      state.showAddBoardModal = !state.showAddBoardModal;
    },
    toggleEditBoardModal(state) {
      state.showEditBoardModal = !state.showEditBoardModal;
    },
    toggleDeleteBoardModal(state) {
      state.showDeleteBoardModal = !state.showDeleteBoardModal;
    },
    toggleViewTaskModal(state) {
      state.showViewTaskModal = !state.showViewTaskModal;
    },
    toggleAddTaskModal(state) {
      state.showAddTaskModal = !state.showAddTaskModal;
    },
    toggleDeleteTaskModal(state) {
      state.showDeleteTaskModal = !state.showDeleteTaskModal;
    },
    toggleEditTaskModal(state) {
      state.showEditTaskModal = !state.showEditTaskModal;
    },
    toggleErrorModal(state) {
      state.showErrorModal = !state.showErrorModal;
    },
    setError(state, action: { payload: string }) {
      state.showErrorModal = true;
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.showErrorModal = false;
      state.errorMessage = null;
    },
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
    resetModals(state) {
      state.showAddBoardModal = false;
      state.showEditBoardModal = false;
      state.showDeleteBoardModal = false;
      state.showViewTaskModal = false;
      state.showAddTaskModal = false;
      state.showDeleteTaskModal = false;
      state.showEditTaskModal = false;
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileSidebar,
  toggleHeaderMenu,
  toggleViewTaskSubmenu,
  toggleAddBoardModal,
  toggleEditBoardModal,
  toggleDeleteBoardModal,
  toggleViewTaskModal,
  toggleAddTaskModal,
  toggleDeleteTaskModal,
  toggleEditTaskModal,
  toggleErrorModal,
  setError,
  clearError,
  toggleSearch,
  resetModals,
} = uiSlice.actions;

export default uiSlice.reducer;
