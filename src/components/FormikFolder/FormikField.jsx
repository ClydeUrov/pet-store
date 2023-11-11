import { ErrorMessage, Field} from "formik";
import css from './FormikField.module.scss';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { SaleCheckbox } from "../SaleCheckbox/SaleCheckbox";
import { useState } from "react";

const FormikField = (props) => {
  const {name, type, value, disabled, width, touched, errors, required, label, optionList, values, setFieldValue} = props;
  const [passwordShow, setPasswordShow] = useState(false);
  const toggleVisibility = () => {
    setPasswordShow((prevPasswordShow) => !prevPasswordShow);
  };
  // if (touched) console.log(touched);
  // if (name === "notAvailable") console.log("here", name);
  // if(values && values[name]) console.log("val", name, values[name]);

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
              onChange={(e) => setFieldValue(name, e.target.value)}
              className={touched && errors ? `${css.invalid} ${css.input}` : `${css.input}`}
              // value={values[name]?.id || ""}
            > 
              <option value={undefined}></option>
              {optionList?.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  defaultValue={values[name] && values[name].id === item.id}
                >
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
        ) : type === "textarea" ? (
          <>
            <label htmlFor={name} className={css.label}>
              {label}
            </label>
            <Field
              as="textarea"
              name={name}
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
        ) : (
          <>
            <label htmlFor={name} className={css.label}>
              {label}
            </label>
            <Field
              name={name}
              type={type === 'password' ? (passwordShow ? 'text' : 'password') : type}
              disabled={disabled}
              // value={value}
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
