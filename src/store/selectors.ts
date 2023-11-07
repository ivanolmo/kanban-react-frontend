import type { RootState } from "~/store/store";
import { ModalType } from "~/utils/constants";

export const selectShowSidebar = (state: RootState) => state.ui.showSidebar;
export const selectShowSubmenu = (state: RootState) => state.ui.showSubmenu;
export const selectCurrentModal = (state: RootState): ModalType | null => {
  const uiState = state.ui;
  if (uiState.showAddBoardModal) return ModalType.AddBoard;
  if (uiState.showDeleteBoardModal) return ModalType.DeleteBoard;
  return null;
};

export const selectCurrentBoard = (state: RootState) =>
  state.board.currentBoard;
export const selectBoards = (state: RootState) => state.board.boards;
