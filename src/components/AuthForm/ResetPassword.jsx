import axiosService from '../../helpers/axios';
import css from "./AuthForm.module.scss";
import { FiChevronLeft } from "react-icons/fi";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { emailSchema } from '../../helpers/schemes';
import Button from '../CustomButton/Button';

const ResetPassword = ({token, setModalState}) => {
	
  const handleSubmit = () => {
    
  }

  return (
    <div className={css.verifyBlock}>
			<p>Enter the email address linked to your account</p>

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
            <Button text={`Return to sign in`} onClickHandler={() => setModalState(4)} buttonSize={"cancel"} />
          </Form>
        )}
      </Formik>

      
		</div>
  )
}

export default ResetPassword;