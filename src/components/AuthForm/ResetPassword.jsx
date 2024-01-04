import axiosService from '../../helpers/axios';
import css from "./AuthForm.module.scss";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { emailSchema } from '../../helpers/schemes';
import Button from '../CustomButton/Button';
import { useState } from 'react';

const ResetPassword = ({setModalState, host}) => {
  const [error, setError] = useState(null);
	
  const handleSubmit = async (values) => {
    const { email } = values;
    
    try {
      const path = `${host}/pet-store`;
      await axiosService.post(`/auth/forgot-password?email=${email}&path=${path}`);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong. Please, try again.");
    }
  }

  return (
    <div className={css.verifyBlock}>
			<p>Please enter your email address to confirm your account before changing your password.</p>

      <Formik
        validationSchema={emailSchema}
        initialValues={{email: ""}}
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
            <button
              className={css.button} 
              style={{padding: "10px 10px", margin: "10px"}} 
              onClick={handleSubmit}
            >
              Reset password
            </button>
            <Button text={`Return to Log In`} onClickHandler={() => setModalState(3)} buttonSize={"cancel"} />
          </Form>
        )}
      </Formik>
      {error && (
        <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
      )}

      
		</div>
  )
}

export default ResetPassword;