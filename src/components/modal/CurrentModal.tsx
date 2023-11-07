import { useSelector } from "react-redux";
import { selectCurrentModal } from "~/store/selectors";

import ModalContainer from "~/components/modal/ModalContainer";
import { MODAL_COMPONENTS } from "~/components/modal/modalMap";

const CurrentModal = () => {
  const currentModal = useSelector(selectCurrentModal);

  if (!currentModal) return null;

  const ModalComponent = MODAL_COMPONENTS[currentModal];
  return (
    <ModalContainer>
      <ModalComponent />
    </ModalContainer>
  );
};

export default CurrentModal;
