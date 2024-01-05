import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import css from "./AuthForm.module.scss";
import { schemaAdminPassword } from "../../helpers/schemes";
import FormikField from '../FormikFolder/FormikField';
import { FaAngleLeft } from "react-icons/fa6";
import axiosService from '../../helpers/axios';

const PasswordRecovery = ({setModalState, token}) => {
  const [error, setError] = useState('');
  const userEmail = JSON.parse(localStorage.getItem('userEmail'));
  const [state, setState] = useState('');

  const handleSubmit = async (values) => {
    const body = {
      email: userEmail.email, 
      newPassword: values.password
    }
    try {
      await axiosService
        .post(`/auth/reset-password?token=${token}`, body)
        .then(() => {
          setState("Success");
          localStorage.removeItem("userEmail");
        })
    } catch (err) {
      setState("Error");
      setError(
        err.response
          ? err.response.data.message
          : "Something went wrong. Please, try again."
      )
    }
  }

  return (
    <div className={css.verifyBlock}>
      {state === "Success" ? 
        <>
          <p>Password successfully updated! You can now access your personal account.</p>
          <button onClick={() => setModalState(3)} className={css.button}>
            Sign in
          </button>
        </>
      :
        <div>
        <Formik
          validationSchema={schemaAdminPassword}
          initialValues={{ password: "",  }}
          onSubmit={handleSubmit}
          
        >
          {(form) => (
            <Form className={css.form}>
              <FormikField
                name="password"
                type="password"
                label="Password"
                width="350px"
                value={form.values.password}
                // disabled={editState.passwordInfo}
                required
              />
              <FormikField
                name="confirm"
                type="password"
                label="Confirm password"
                width="350px"
                value={form.values.confirm}
                // disabled={editState.passwordInfo}
                required
              />
              {error && (
                <p className={css.errorMes}>{error}</p>
              )}

              <div className={css.submitForm}>
                <button type="submit" className={css.button} disabled={form.isSubmitting}>
                  Update password
                </button>
                <button type="button" className={css.return_button} onClick={() => setModalState(3)}>
                  <FaAngleLeft /> {' '}Return to log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        </div>
      }
    </div>
  )
}

export default PasswordRecovery;