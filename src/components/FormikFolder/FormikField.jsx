import { ErrorMessage, Field} from "formik";
import css from './FormikField.module.scss';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { SaleCheckbox } from "../SaleCheckbox/SaleCheckbox";
import { useState } from "react";

const FormikField = (props) => {
  const {name, type, value, disabled, width, touched, errors, required, label, data} = props;
  const [passwordShow, setPasswordShow] = useState(false);
  const toggleVisibility = () => {
    setPasswordShow((prevPasswordShow) => !prevPasswordShow);
  };
// item.id || ""
  return (
    <div className={css.additions}>
        <div className={css.input__wrapper}>
        {type === "select" ? (
          <div>
            <label htmlFor={name} className={css.label}>
              {label}
            </label>
            <Field
              as="select"
              name={name}
              disabled={disabled}
              style={{ width: width }}
              className={touched && errors ? `${css.invalid} ${css.input}` : `${css.input}`}
            > 
            
              <option value=""></option>
              {data.map((item) => (
                <option key={item.id} value={item.id}>  
                  {item.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name={name} component="p" className={css.error} />
          </div>
        ) :
        type === "checkout" ? (
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
              type={type === 'password' ? (passwordShow ? 'text' : 'password') : type}
              disabled={disabled}
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
