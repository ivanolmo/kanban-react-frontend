import type { RootState } from "~/store/store";
import { ModalType } from "~/utils/constants";

export const selectCurrentModal = (state: RootState): ModalType | null => {
  const uiState = state.ui;

  if (uiState.showAddBoardModal) return ModalType.AddBoard;
  if (uiState.showDeleteBoardModal) return ModalType.DeleteBoard;
  if (uiState.showEditBoardModal) return ModalType.EditBoard;
  if (uiState.showViewTaskModal) return ModalType.ViewTask;

  return null;
};

export const selectShowSidebar = (state: RootState) => state.ui.showSidebar;
export const selectShowHeaderMenu = (state: RootState) =>
  state.ui.showHeaderMenu;
export const selectShowViewTaskMenu = (state: RootState) =>
  state.ui.showViewTaskMenu;
export const selectShowEditTaskModal = (state: RootState) =>
  state.ui.showEditTaskModal;

export const selectCurrentTask = (state: RootState) => state.board.currentTask;
export const selectCurrentBoard = (state: RootState) =>
  state.board.currentBoard;
export const selectBoards = (state: RootState) => state.board.boards;
