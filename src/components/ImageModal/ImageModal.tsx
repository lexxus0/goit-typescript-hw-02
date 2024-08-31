import Modal from "react-modal";
import css from "./ImageModal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  small: string;
};

const CUSTOM_STYLES: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    border: "none",
    transform: "translate(-50%, -50%)",
    padding: "0",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const ImageModal: React.FC<Props> = ({ isOpen, onClose, small }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={CUSTOM_STYLES}
      contentLabel="Image Modal"
    >
      <div className={css.modalContent}>
        <img src={small} alt="modal" className={css.modalImage} />
      </div>
    </Modal>
  );
};

export default ImageModal;
