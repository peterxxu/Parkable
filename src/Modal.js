import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Modal.css";

export default function Modal(props) {
  return createPortal(
    <div className="custom-modal">
      <button
        type="button"
        id="close-button"
        onClick={() => {
          props.onClose();
        }}
      >
        X
      </button>
      <h5 className="modal-text">
        <Link to={"/"}>Home</Link>
      </h5>
      <h5 className="modal-text">
        <Link to={"/contact"}>Contact US</Link>
      </h5>
      <h5 className="modal-text">
        <Link to={"/admin"}>Admin</Link>
      </h5>
    </div>,
    document.getElementById("modal-container")
  );
}
