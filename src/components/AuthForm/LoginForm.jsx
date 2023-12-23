import { useState } from "react";
import { CheckboxIcon } from "../../icons/icons";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import css from "./AuthForm.module.scss";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaLogIn } from "../../helpers/schemes";
import { useUserActions } from "../../helpers/user.actions";
import Loader from "../Loader/Loader";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const LogInForm = ({ onClose, setModalState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (formData, { resetForm }) => {
    setIsLoading(true);
    await userActions
      .login(formData)
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError(err.message)
      })
      .finally(setIsLoading(false));
    return;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          validationSchema={schemaLogIn}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className={css.form}>
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
                  type="email"
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
                  type={passwordShow ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  id="visibilityBtn"
                  className={css.iconPassword}
                  onClick={togglePassword}
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

              <div className={css.checkbox__wrapper_login}>
                <label className={css.checkbox}>
                  {props.values.rememberMe ? (
                    <div className={css.checkbox__icon_true}>
                      <CheckboxIcon />
                    </div>
                  ) : (
                    <div className={css.checkbox__icon_false}>
                      <CheckboxIcon />
                    </div>
                  )}
                  <Field
                    className={css.checkbox__field}
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                  />
                  <span className={css.checkbox__text}>Remember me</span>
                </label>
                <p>
                  <a href="/" className={css.forgot_password}>
                    Forgot password?
                  </a>
                </p>
              </div>
              {error && <p style={{color:"red", marginBottom:"20px"}}>{error}</p>}

              <button type="submit" className={css.button}>
                Log in
              </button>
              <button type="submit" className={css.link} onClick={() => setModalState(1)}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default LogInForm;
