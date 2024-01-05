import css from "./AuthForm.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { emailSchema } from "../../helpers/schemes";
import { useState } from "react";
import axiosService from "../../helpers/axios";
import { FaAngleLeft } from "react-icons/fa";

const PasswordReset = ({ setModalState, host }) => {
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    const { email } = values;

    try {
      const path = `${host}/pet-store`;
      await axiosService
        .post(`/auth/forgot-password?email=${email}&path=${path}`)
        .then(() =>
          localStorage.setItem("userEmail", JSON.stringify({ email: email }))
        );
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Something went wrong. Please, try again."
      );
    }
  };

  return (
    <div className={css.verifyBlock}>
      <p>
        Please enter your email address to confirm your account before changing
        your password.
      </p>

      <Formik
        validationSchema={emailSchema}
        initialValues={{ email: "" }}
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
                onClick={setError(null)}
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            {error && <p className={css.errorMes}>{error}</p>}

            <button
              className={css.button}
              onClick={handleSubmit}
            >
              Reset password
            </button>

            <button type="button" onClick={() => setModalState(3)} className={css.return_button}>
              <FaAngleLeft /> Return to log in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordReset;
