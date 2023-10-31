import { ErrorMessage, Field} from "formik";
import css from './FormikField.module.scss';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { SaleCheckbox } from "../SaleCheckbox/SaleCheckbox";
import { useState } from "react";

const FormikField = (props) => {
  const {name, type, value, disabled, width, handleBtnEnable, touched, errors, required, label} = props;
  const [passwordShow, setPasswordShow] = useState(false);
  const toggleVisibility = () => {
    setPasswordShow((prevPasswordShow) => !prevPasswordShow);
  };

  return (
    <div className={css.additions}>
        <div className={css.input__wrapper}>
        {type === "checkout" ? (
          <div>
            <SaleCheckbox />
          </div>
        ) : type === "unstyled" ? (
          <div>
            <label htmlFor={name} className={css.label}>
              {label}
            </label>
            <p style={{fontSize:"16px", lineHeight:"2.5"}}>{value}</p>
          </div>
        ) : (
          <>
            <label htmlFor={name} className={css.label}>
              {label}
            </label>
            <Field
              name={name}
              id={name}
              type={type === 'password' ? (passwordShow ? 'text' : 'password') : type}
              value={value ? value : undefined}
              disabled={disabled}
              onClick={handleBtnEnable}
              style={{ width: width }}
              className={touched && errors ? `${css.invalid} ${css.input}` : `${css.input}`}
              required={required ? "required" : undefined}
            />
            {type === "password" && (
              <button type="button" className={css.iconPassword} onClick={toggleVisibility} disabled={disabled}>
                {passwordShow ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
              </button>
            )}
            <ErrorMessage name={name} component="p" className={css.error} />
          </>
        )}
      </div>
    </div>
  )
};
export default FormikField;
