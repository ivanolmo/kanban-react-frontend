import AddBoard from "~/components/modal/AddBoard";
import DeleteBoard from "~/components/modal/DeleteBoard";
import EditBoard from "~/components/modal/EditBoard";
import ViewTask from "~/components/modal/ViewTask";
import { ModalType } from "~/utils/constants";

export const MODAL_COMPONENTS: Record<ModalType, React.ComponentType> = {
  [ModalType.AddBoard]: AddBoard,
  [ModalType.DeleteBoard]: DeleteBoard,
  [ModalType.EditBoard]: EditBoard,
  [ModalType.ViewTask]: ViewTask,
};
