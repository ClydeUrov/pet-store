import css from "./SaleCheckbox.module.scss";
import { useState } from "react";

export const SaleCheckbox = () => {
  const [checkbox, setCheckbox] = useState(false);

  const toggleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <>
      <label htmlFor="sale" className={css.checkbox_label}>
        <span className={css.checkbox_title}>On sale </span>

        <input
          className={css.checkbox_input}
          type="checkbox"
          name="sale"
          id="sale"
          onClick={toggleCheckbox}
        />

        <div className={css.checkbox_field}>
          {!checkbox ? (
            <span className={css.checkbox_toggle}></span>
          ) : (
            <span className={css.checkbox_toggle_false}></span>
          )}
        </div>
      </label>
    </>
  );
};
