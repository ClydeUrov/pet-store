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
import { schemaSignUp } from "../../helpers/schemes";
//import { register } from '../../redux/auth/operations';

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  policy: false,
  remember: false,
};

const RegisterForm = ({onClick, onClose}) => {
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

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      policy: formData.policy,
      remember: formData.remember,
    };
    console.log("newUser", newUser);
    resetForm();
    // dispatch(addNewUser(newUser));
    onClose();
    navigate('/user/account');
    return;
  };

  return (
    <>
      <Formik
        validationSchema={schemaSignUp}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(props) => (
          
        <Form className={css.form}>
            <div className={css.input__wrapper}>
              <label htmlFor="firstName" className={css.label}>
                First name{" "}
              </label>
              <Field
                className={ (props.touched.firstName && props.errors.firstName) ? `${css.invalid} ${css.input}` : `${css.input}` }
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
                className={ (props.touched.lastName && props.errors.lastName) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="lastName"
                id="lastName"
                type="text"
                //    placeholder=""

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

            <div className={css.checkbox__wrapper}>
              <label className={css.checkbox}>
                {props.values.policy ? (
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
                  name="policy"
                  id="policy"
                  required
                />

                <span className={css.checkbox__text}>
                  I agree to the processing of my data.
                </span>
              </label>

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
            </div>

            <button type="submit" className={css.button}>
              Sign Up
            </button>
            <button type="submit" className={css.link} onClick={onClick}>
            Already have an account? Log in
            </button>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;