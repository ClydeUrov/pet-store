import { ErrorMessage, Field } from "formik";
import css from './FormikField.module.scss';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { SaleCheckbox } from "../SaleCheckbox/SaleCheckbox";
import React, { useState } from "react";

const FormikField = (props) => {
  const {name, type, value, disabled, width, touched, errors, required, label, optionList, values, setFieldValue} = props;
  const [passwordShow, setPasswordShow] = useState(false);

  const toggleVisibility = () => {
    setPasswordShow((prevPasswordShow) => !prevPasswordShow);
  };

  const handleCheckbox = (isChecked) => {
    setFieldValue('newArrival', isChecked);
  }

  const buildTree = (optionList) => {
    const lookup = {};
    optionList.forEach((item) => {
      lookup[item.id] = { ...item, children: [] };
    });
  
    const tree = [];
    optionList.forEach((item) => {
      if (item.parent) {
        lookup[item.parent.id].children.push(lookup[item.id]);
      } else {
        tree.push(lookup[item.id]);
      }
    });
  
    return tree;
  };
  
  const renderTreeOptions = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <option
          value={item.id}
          style={{
            color: values[name]?.id === item.id ? "#ffad4d" : ""
          }}
        >
          {values[name]?.id === item.id ? "" : "\u00A0".repeat(level * 3)}
          {item.name}
        </option>
        {item.children.length > 0 && renderTreeOptions(item.children, level + 1)}
      </React.Fragment>
    ));
  };
  
  const tree = buildTree(optionList || []);

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
              onChange={(e) => {
                const selectedId = parseInt(e.target.value, 10);
                if (!isNaN(selectedId)) {
                  const selected = optionList.find((item) => item.id === selectedId);
                  setFieldValue(name, selected);
                }
              }}
              className={touched && errors ? `${css.invalid} ${css.input}` : `${css.input}`}
              value={values[name] ? values[name].id : ""}
            > 
              <option value={undefined}></option>
              {name === 'category' ? (
                renderTreeOptions(tree)
              ) : (
                optionList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              )}
            </Field>
            <ErrorMessage name={name} component="p" className={css.error} />
          </div>
        
        ) : type === "checkout" ? (
          <div>
            <label className={css.label}>
              {label}
            </label>
            <SaleCheckbox onChange={handleCheckbox} checked={values.newArrival}/>
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
              style={{ width: width, resize: "vertical" }}
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
              style={{ width: width }}
              className={touched && errors ? `${css.invalid} ${css.input}` : `${css.input}`}
              disabled={disabled}
              // required={required ? "required" : undefined}
            />
            {type === "password" && (
              <button type="button" className={css.iconPassword} onClick={toggleVisibility} disabled={disabled}>
                {passwordShow ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
              </button>
            )}
            <ErrorMessage name={name} component="p" className="error-message" />
          </>
        )}
      </div>
    </div>
  )
};
export default FormikField;
