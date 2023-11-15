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
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
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
  toggleSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
