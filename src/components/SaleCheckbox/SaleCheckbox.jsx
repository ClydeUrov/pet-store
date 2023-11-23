import css from "./SaleCheckbox.module.scss";

export const SaleCheckbox = ({title, onChange, checked}) => {

  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <>
      <label htmlFor="sale" className={css.checkbox_label}>
        {title ? <span className={css.checkbox_title}>{title}</span> : null}

        <input
          className={css.checkbox_input}
          type="checkbox"
          name="sale"
          id="sale"
          onChange={toggleCheckbox}
          checked={checked}
        />

        <div className={css.checkbox_field}>
          {!checked ? (
            <span className={css.checkbox_toggle}></span>
          ) : (
            <span className={css.checkbox_toggle_false}></span>
          )}
        </div>
      </label>
    </>
  );
};
