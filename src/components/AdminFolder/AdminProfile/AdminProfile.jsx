import { useState } from "react";
import { Form, Formik } from "formik";
import css from "./AdminProfile.module.scss";
import FormikField from "../../FormikFolder/FormikField";
import { schemaUserPersonalInfo } from "../../../helpers/schemes";
import { GoPencil } from "react-icons/go";

const AdminProfile = () => {
  const [disabled, setDisabled] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  // const toggleDisabled = () => {
  //   setDisabled((prevDisabled) => !prevDisabled);
  //   // Reset disabledBtn when toggling disabled
  //   setDisabledBtn(true);
  // };

  // const togglePassword = () => {
  //   setPasswordShow((prevPasswordShow) => !prevPasswordShow);
  // };

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
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Admin information</p>
      </div>
      <Formik
        validationSchema={schemaUserPersonalInfo}
        initialValues={{
          surname: "Olivi",
          email: "oliviarhye@gmail.com",
          name: "aArhye",
          password: "12345678",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => {
        return (
          <Form className={css.form}>
            <FormikField
              name="name"
              type="text"
              label="Name"
              width="276px"
              value={props.values.name}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="email"
              type="unstyled"
              label="E-mail"
              width="276px"
              value={props.values.email}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="surname"
              type="text"
              label="Surname"
              width="276px"
              value={props.values.surname}
              disabled={disabled}
              onClick={handleBtnEnable}
              onTogglePassword={togglePassword}
              required
            />

            <FormikField
              name="password"
              type="password"
              label="Password"
              width="276px"
              value={props.values.password}
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
              <div className={css.editForm}>
                <ul className={css.list__btn}>
                  <li className={css.item__btn}>
                    <button type="submit" className={css.button} disabled={disabledBtn}>
                      Confirm
                    </button>
                  </li>
                  <li className={css.item__btn}>
                    <button type="cancel" onClick={() => handleCancel(props)} className={css.button}>
                      Cancel
                    </button>
                  </li>
                </ul>
                <FormikField
                  name="confirm"
                  type="password"
                  label="Confirm password"
                  width="276px"
                  value={props.values.confirm}
                  disabled={disabled}
                  onClick={handleBtnEnable}
                  onTogglePassword={togglePassword}
                  required
                />
              </div>
            )}
          </Form>
        )}}
      </Formik>
    </div>
  );
};

export default AdminProfile;