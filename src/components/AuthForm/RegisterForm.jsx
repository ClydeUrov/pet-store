import { useState } from "react";
import { CheckboxIcon } from "../../icons/icons";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import css from "./AuthForm.module.scss";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaSignUp } from "../../helpers/schemes";
import { useUserActions } from "../../helpers/user.actions";
import { RotatingLines } from "react-loader-spinner";

const RegisterForm = ({ setModalState, host }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleSubmit = async (formData) => {
    const path = `${host}/pet-store`;
    setIsLoading(true);
    try {
      await userActions.register(formData, path);
      localStorage.setItem(
        "userEmail",
        JSON.stringify({ email: formData.email, PawSomeRegistarion: true })
      );
      setModalState(2);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          const userData = {
            email: formData.email,
            message: err.response.data.message,
            PawSomeRegistarion: true
          };
          localStorage.setItem("userEmail", JSON.stringify(userData));
          setModalState(2);
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schemaSignUp}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          birthDate: "",
          password: "",
          confirm: "",
          consentToProcessData: false,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className={css.form}>
            <div className={css.input__wrapper}>
              <label htmlFor="firstName" className={css.label}>
                First name{" "}
              </label>
              <Field
                className={
                  props.touched.firstName && props.errors.firstName
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="firstName"
                id="firstName"
                type="text"
                required
              />
              <ErrorMessage
                name="firstName"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="lastName" className={css.label}>
                Last name{" "}
              </label>
              <Field
                className={
                  props.touched.lastName && props.errors.lastName
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="lastName"
                id="lastName"
                type="text"
                required
              />
              <ErrorMessage
                name="lastName"
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
                type="email"
                required
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="birthDate" className={css.label}>
                Birth Date
              </label>
              <Field
                className={
                  props.touched.birthDate && props.errors.birthDate
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="birthDate"
                id="birthDate"
                type="date"
                required
              />
              <ErrorMessage
                name="birthDate"
                component="p"
                className={css.error}
              />
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
                onClick={() => setPasswordShow(!passwordShow)}
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
                Confirm Password
              </label>
              <Field
                className={
                  props.touched.password && props.errors.password
                    ? `${css.invalid} ${css.input}`
                    : `${css.input}`
                }
                name="confirm"
                id="confirm"
                type={confirmPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                id="visibilityBtn"
                className={css.iconPassword}
                onClick={() => {setConfirmPassword(!confirmPassword)}}
              >
                {confirmPassword ? (
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

            <div className={css.checkbox__wrapper}>
              <label className={css.checkbox}>
                {props.values.consentToProcessData ? (
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
                  name="consentToProcessData"
                  id="consentToProcessData"
                  required
                />

                <span className={css.checkbox__text}>
                  I agree to processing of my data.
                </span>
              </label>
            </div>

            {error && <p className={css.errorMes}>{error}</p>}

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
              <p>Sign Up</p>
            </button>
            <button
              type="submit"
              className={css.link}
              onClick={() => setModalState(3)}
            >
              Already have an account? Log in
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
