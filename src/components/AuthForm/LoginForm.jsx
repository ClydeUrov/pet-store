import { useState } from "react";
// import { useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";
//import { useSelector } from 'react-redux';
import {
  CheckboxIcon,
} from "../../icons/icons";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import css from "./AuthForm.module.scss";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaLogIn } from "../../helpers/schemes";
//import { logIn } from '../../redux/auth/operations';

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const LogInForm = ({onClick, onClose}) => {
   const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  //   const handleSubmit = async (formData, { resetForm }) => {
  //    // const { error } = await login(formData);
  //     if (error) {
  //       setIsError({
  //         message: error.data.message,
  //         additionalInfo: error.data.additionalInfo,
  //       });
  //       resetForm();
  //       return;
  //     } else {
  //       navigate('/user');
  //     }
  //   };
  
  const handleSubmit = async (formData, { resetForm }) => {
    console.log("formData", formData);

    const existingUser = {
      email: formData.email,
      password: formData.password,
      remember: formData.remember,
    };
    console.log("existingUser", existingUser);
    resetForm();
    // dispatch(logIn(existingUser));
    onClose();
    navigate('/user/account');
    return;
  };

  return (
    <>
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
                className={ (props.touched.email && props.errors.email) ? `${css.invalid} ${css.input}` : `${css.input}` }
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
                className={ (props.touched.password && props.errors.password) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="password"
                id="password"
                type={passwordShow ? "text" : "password"}

                required
              />
              <button type="button"
                id="visibilityBtn"
                className={css.iconPassword}
                onClick={togglePassword}
              >
                {passwordShow ? <MdOutlineVisibility size={24}/> : <MdOutlineVisibilityOff size={24}/>}
              </button>
              <ErrorMessage
                name="password"
                component="p"
                className={css.error}
              />
             
            </div>

            <div className={css.checkbox__wrapper_login}>
           
              <label className={css.checkbox}>
                {props.values.remember ? (
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
                  name="remember"
                  id="remember"
                />
                <span className={css.checkbox__text}>Remember me</span>
              </label>
  <p>
                <a href="/" className={css.forgot_password}>
                  Forgot password?
                </a>
            </p>

            </div>

            <button type="submit" className={css.button}>
              Log in
            </button>
            <button type="submit" className={css.link} onClick={onClick}>
            Sign Up
            </button>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default LogInForm;