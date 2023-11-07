import AddBoard from "~/components/modal/AddBoard";
import { ModalType } from "~/types/constants";

export const MODAL_COMPONENTS: Record<ModalType, React.ComponentType> = {
  [ModalType.AddBoard]: AddBoard,
  // [ModalType.EditBoard]: EditBoard,
  // [ModalType.DeleteBoard]: DeleteBoard,
  // [ModalType.ViewTask]: ViewTask,
  // [ModalType.AddTask]: AddTask,
  // [ModalType.EditTask]: EditTask,
  // [ModalType.DeleteTask]: DeleteTask,
};
