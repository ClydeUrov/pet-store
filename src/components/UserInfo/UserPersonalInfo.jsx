import css from "./UserInfo.module.scss";
// import { useState, useEffect } from 'react';

import { useState } from "react";
import { GoPencil } from "react-icons/go";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
//import { useSelector } from 'react-redux';
import { user } from "../UserAccount/UserAccount";

import { Form, Formik } from "formik";
import { schemaUserPersonalInfo } from "../../helpers/schemes";
import FormikField from "../FormikFolder/FormikField";

const initialValues = {
  name: user.name,
  surname: user.surname,
  email: user.email,
  password: "qweqweqwe",
  confirm: "qweqweqwe",
};

export const UserPersonalInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
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
        {(props) => {
        console.log("props in User", props);
        return (
          <Form className={css.form}>
            <FormikField
              name="name"
              type="text"
              label="Name"
              width="100%"
              // value={props.values.name}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="surname"
              type="text"
              label="Surname"
              width="100%"
              // value={props.values.surname}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="email"
              type="email"
              label="E-mail"
              width="100%"
              // value={props.values.email}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="password"
              type="password"
              label="Password"
              width="100%"
              // value={props.values.password}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            

            {disabled ? (
              <button type="button" onClick={toggleDisabled} className={css.button}>
                Edit
                <GoPencil size={20} className={css.btn__icon} />
              </button>
            ) : (
              <>
              <FormikField
                name="confirm"
                type="password"
                label="Confirm password"
                width="100%"
                // value={props.values.confirm}
                disabled={disabled}
                onClick={handleBtnEnable}
                onTogglePassword={togglePassword}
                required
              />
              <ul className={css.list__btn}>
                <li className={css.item__btn}>
                  <button type="submit" className={css.button} disabled={disabledBtn}>
                    Confirm
                  </button>
                </li>
                <li className={css.item__btn}>
                  <button type="button" onClick={() => handleCancel(props)} className={css.button}>
                    Cancel
                  </button>
                </li>
              </ul>
              </>
            )}
          </Form>
        )}}
      </Formik>
    </>
  );
};
