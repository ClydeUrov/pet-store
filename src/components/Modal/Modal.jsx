import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.scss";
import { RxCross1 } from "react-icons/rx";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ title, children, onClose, disabledBack, cart, productsQuantity}) => {
  //  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      {disabledBack ? (
        <div>{children}</div>
      ) : (
        <div className={cart ? `${css.cart_container} ${css.activeContainer}` : css.container}>
          <button className={css.icon} onClick={handleBackdropClick}>
            <RxCross1 size={20} onClick={handleBackdropClick} />
          </button>
          {title ? <h2 className={css.title}>{title} {productsQuantity ? <p>{productsQuantity}</p> : null}</h2> : null}

          {children}
        </div>
      )}
    </div>,
    modalRoot
  );
};

export default Modal;

export const ModalFilter = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      {children}
    </div>,
    modalRoot
  );
};
