import css from "./ComfirmDeletion.module.scss";

const ConfirmDeletion = ({ onConfirm, onCancel }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <> 
      <p className={css.logout__text}>Are you sure you want to delete the product?</p>
      <button
        type="submit"
        className={css.logout__button}
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </>
  );
};

export default ConfirmDeletion;
