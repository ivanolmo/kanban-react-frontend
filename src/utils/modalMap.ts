import AddBoard from "~/components/modal/AddBoard";
import DeleteBoard from "~/components/modal/DeleteBoard";
import { ModalType } from "~/utils/constants";

export const MODAL_COMPONENTS: Record<ModalType, React.ComponentType> = {
  [ModalType.AddBoard]: AddBoard,
  [ModalType.DeleteBoard]: DeleteBoard,
};
