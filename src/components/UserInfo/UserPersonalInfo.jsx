import css from "./UserInfo.module.scss";
// import { useState, useEffect } from 'react';

import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
//import { useSelector } from 'react-redux';
import { user } from "../UserAccount/UserAccount";

import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaUserPersonalInfo } from "../../helpers/schemes";

const initialValues = {
  name: user.name,
  surname: user.surname,
  email: user.email,
  password: "qweqweqwe",
  confirm: "qweqweqwe",
};

export const UserPersonalInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShow(!confirmPasswordShow);
  };

  const handleBtnDisable = (e) => {
    setDisabledBtn(true);
  };
  const handleBtnEnable = (e) => {
    setDisabledBtn(false);
  };

  const handleCancel = (props) => {
    props.handleReset();
    toggleDisabled();
    handleBtnDisable();
    return;
  };

  const handleSubmit = async (formData) => {
    const newInfo = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      confirm: formData.confirm,
    };
    console.log("newInfo", newInfo);
    toggleDisabled();
    handleBtnDisable();
    // dispatch(addNewUser(newUser));
    return;
  };

  return (
    <>
      <h3 className={css.title}>Personal information</h3>

      <Formik
        validationSchema={schemaUserPersonalInfo}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className={css.form}>
            <div className={css.input__wrapper}>
              <label htmlFor="name" className={css.label}>
                Name{" "}
              </label>
              <Field
                name="name"
                id="name"
                type="text"
                value={props.values.name}
                disabled={disabled}
                onClick={handleBtnEnable}
                className={
                  props.touched.name && props.errors.name
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                required
              />
              <ErrorMessage name="name" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="surname" className={css.label}>
                Surname
              </label>
              <Field
                className={
                  props.touched.surname && props.errors.surname
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="surname"
                id="surname"
                value={props.values.surname}
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <ErrorMessage
                name="surname"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="email" className={css.label}>
                E-mail
              </label>
              <Field
                className={
                  props.touched.email && props.errors.email
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="email"
                id="email"
                value={props.values.email}
                type="email"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="password" className={css.label}>
                Password
              </label>
              <Field
                className={
                  props.touched.password && props.errors.password
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="password"
                id="password"
                value={props.values.password}
                type={passwordShow ? "text" : "password"}
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <button
                type="button"
                // id="visibilityBtn"
                className={css.iconPassword}
                onClick={togglePassword}
                disabled={disabled}
              >
                {passwordShow ? (
                  <MdOutlineVisibility size={24} />
                ) : (
                  <MdOutlineVisibilityOff size={24} />
                )}
              </button>
              <ErrorMessage
                name="password"
                component="p"
                className={css.error}
              />
            </div>
            <div className={css.input__wrapper}>
              <label htmlFor="confirm" className={css.label}>
                Confirm password
              </label>
              <Field
                className={
                  props.touched.confirm && props.errors.confirm
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="confirm"
                id="confirm"
                value={props.values.confirm}
                type={confirmPasswordShow ? "text" : "password"}
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <button
                type="button"
                className={css.iconPassword}
                onClick={toggleConfirmPassword}
                disabled={disabled}
              >
                {confirmPasswordShow ? (
                  <MdOutlineVisibility size={24} />
                ) : (
                  <MdOutlineVisibilityOff size={24} />
                )}
              </button>
              <ErrorMessage
                name="confirm"
                component="p"
                className={css.error}
              />
            </div>

            {disabled ? (
              <button
                type="button"
                onClick={toggleDisabled}
                className={css.button}
              >
                Edit
                <GoPencil size={20} className={css.btn__icon} />
              </button>
            ) : (
              <ul className={css.list__btn}>
                <li className={css.item__btn}>
                  <button
                    type="submit"
                    className={css.button}
                    disabled={disabledBtn}
                  >
                    Confirm
                  </button>
                </li>
                <li className={css.item__btn}>
                  <button
                    type="button"
                    onClick={() => handleCancel(props)}
                    className={css.button}
                  >
                    Cancel
                  </button>
                </li>
              </ul>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
