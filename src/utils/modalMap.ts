import AddBoard from "~/components/modal/AddBoard";
import AddTask from "~/components/modal/AddTask";
import DeleteBoard from "~/components/modal/DeleteBoard";
import DeleteTask from "~/components/modal/DeleteTask";
import EditBoard from "~/components/modal/EditBoard";
import EditTask from "~/components/modal/EditTask";
import ViewTask from "~/components/modal/ViewTask";
import { ModalType } from "~/utils/constants";

export const MODAL_COMPONENTS: Record<ModalType, React.ComponentType> = {
  [ModalType.AddBoard]: AddBoard,
  [ModalType.DeleteBoard]: DeleteBoard,
  [ModalType.EditBoard]: EditBoard,
  [ModalType.ViewTask]: ViewTask,
  [ModalType.AddTask]: AddTask,
  [ModalType.EditTask]: EditTask,
  [ModalType.DeleteTask]: DeleteTask,
};
