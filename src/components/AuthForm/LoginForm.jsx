import { useState } from "react";
import { CheckboxIcon } from "../../icons/icons";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import css from "./AuthForm.module.scss";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaLogIn } from "../../helpers/schemes";
import { useUserActions } from "../../helpers/user.actions";
import Loader from "../Loader/Loader";
import { useUserContext } from "../../helpers/routs/UserLoginedContext";
import { RotatingLines } from "react-loader-spinner";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const LogInForm = ({ onClose, setModalState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userActions = useUserActions();
  const { setUserLogined } = useUserContext();

  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (formData, { resetForm }) => {
    setIsLoading(true);
    try {
      await userActions.login(formData, setUserLogined);
      resetForm();
      onClose();
    } catch (err) {
      err.response.status === 401 ? setError("Unauthorized, please register") :
      err.response && err.response.data ? setError(err.response.data.message) : setError(err.message);
    } finally {
      setIsLoading(false);
    }
    return;
  };

  return (
    <Formik
      validationSchema={schemaLogIn}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, touched, errors }) => (
        <Form className={css.form}>
          <div className={css.input__wrapper}>
            <label htmlFor="email" className={css.label}>
              E-mail
            </label>
            <Field
              className={`${touched.email && errors.email ? `${css.invalid} ${css.input}` : css.input}`}
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
              className={`${touched.password && errors.password ? `${css.invalid} ${css.input}` : css.input}`}
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
            <ErrorMessage name="password" component="p" className={css.error} />
          </div>

          <div className={css.checkbox__wrapper_login}>
            <label className={css.checkbox}>
              {values.rememberMe ? (
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
            <p onClick={() => setModalState(5)} className={css.forgot_password}>
              Forgot password?
            </p>
          </div>

          {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}

          <button type="submit" className={css.button}>
            {isLoading && (
              <span style={{ marginRight: "20px" }}>
                <RotatingLines
                  strokeColor="#ffffff"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="40"
                  height="1"
                  visible={true}
                />
              </span>
            )}
            <p>Log in</p>
          </button>

          <button type="submit" className={css.link} onClick={() => setModalState(1)}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
