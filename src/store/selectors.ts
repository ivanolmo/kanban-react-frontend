import type { RootState } from "~/store/store";
import { ModalType } from "~/utils/constants";

export const selectCurrentModal = (state: RootState): ModalType | null => {
  const uiState = state.ui;

  if (uiState.showAddBoardModal) return ModalType.AddBoard;
  if (uiState.showDeleteBoardModal) return ModalType.DeleteBoard;
  if (uiState.showEditBoardModal) return ModalType.EditBoard;
  if (uiState.showViewTaskModal) return ModalType.ViewTask;
  if (uiState.showAddTaskModal) return ModalType.AddTask;
  if (uiState.showEditTaskModal) return ModalType.EditTask;
  if (uiState.showDeleteTaskModal) return ModalType.DeleteTask;
  if (uiState.showErrorModal) return ModalType.Error;
  if (uiState.showSearch) return ModalType.Search;

  return null;
};

export const selectShowSidebar = (state: RootState) => state.ui.showSidebar;
export const selectShowMobileSidebar = (state: RootState) =>
  state.ui.showMobileSidebar;
export const selectShowHeaderMenu = (state: RootState) =>
  state.ui.showHeaderMenu;
export const selectShowViewTaskSubmenu = (state: RootState) =>
  state.ui.showViewTaskSubmenu;
export const selectShowEditTaskModal = (state: RootState) =>
  state.ui.showEditTaskModal;

export const selectCurrentTask = (state: RootState) => state.board.currentTask;
export const selectCurrentBoard = (state: RootState) =>
  state.board.currentBoard;
export const selectBoards = (state: RootState) => state.board.boards;
export const selectErrorMessage = (state: RootState) => state.ui.errorMessage;
