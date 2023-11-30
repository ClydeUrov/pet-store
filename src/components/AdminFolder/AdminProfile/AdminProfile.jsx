import { useState } from "react";
import { Form, Formik } from "formik";
import css from "./AdminProfile.module.scss";
import FormikField from "../../FormikFolder/FormikField";
import { schemaUserPersonalInfo } from "../../../helpers/schemes";
import { GoPencil } from "react-icons/go";

const AdminProfile = () => {
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleCancel = (props) => {
    props.handleReset();
    toggleDisabled();
    return;
  };

  const handleEditEnable = (props) => {
    toggleDisabled();
    props.setFieldValue('editEnabled', true);
  };

  const handleSubmit = async (formData) => {
    if (formData.editEnabled) {
      const userInfo = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
      };
      console.log("User Info", userInfo);
    } else {
      const passwordInfo = {
        password: formData.password,
        confirm: formData.confirm,
      };
      console.log("Password Info", passwordInfo);
    }

    toggleDisabled();
    // props.setFieldValue('editEnabled', false);
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Admin information</p>
      </div>
      <div className={css.formContainer}>
      <Formik
        validationSchema={schemaUserPersonalInfo}
        initialValues={{
          surname: "Olivi",
          email: "oliviarhye@gmail.com",
          name: "aArhye",
          editEnabled: false,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className={css.form}>
            <FormikField
              name="name"
              type="text"
              label="Name"
              width="276px"
              value={props.values.name}
              disabled={disabled}
              required
            />
            <FormikField
              name="surname"
              type="text"
              label="Surname"
              width="276px"
              value={props.values.surname}
              disabled={disabled}
              required
            />
            <FormikField
              name="email"
              type="unstyled"
              label="E-mail"
              width="276px"
              value={props.values.email}
              disabled={disabled}
              required
            />
            {disabled ? (
              <button type="button" onClick={() => handleEditEnable(props)} className={css.button}>
                Edit
                <GoPencil size={20} className={css.btn__icon} />
              </button>
            ) : (
              <div className={css.editForm}>
                <ul className={css.list__btn}>
                  <li className={css.item__btn}>
                    <button type="submit" className={css.button} disabled={props.isSubmitting}>
                      Confirm
                    </button>
                  </li>
                  <li className={css.item__btn}>
                    <button type="button" onClick={() => handleCancel(props)} className={css.button}>
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            )}            
          </Form>
        )}
      </Formik>
      <Formik
        validationSchema={schemaUserPersonalInfo}
        initialValues={{
          password: "12345678",
          confirm: "12345678",
          editEnabled: false,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className={css.form}>
            <h3 style={{marginBottom:"20px"}}>Your password</h3>
            <FormikField
              name="password"
              type="password"
              label="Password"
              width="276px"
              value={props.values.password}
              disabled={disabled}
              required
            />
            <FormikField
              name="confirm"
              type="password"
              label="Confirm password"
              width="276px"
              value={props.values.confirm}
              disabled={disabled}
              required
            />

            {disabled ? (
              <button type="button" onClick={() => handleEditEnable(props)} className={css.button}>
                Edit
                <GoPencil size={20} className={css.btn__icon} />
              </button>
            ) : (
              <div className={css.editForm}>
                <ul className={css.list__btn}>
                  <li className={css.item__btn}>
                    <button type="submit" className={css.button} disabled={props.isSubmitting}>
                      Confirm
                    </button>
                  </li>
                  <li className={css.item__btn}>
                    <button type="button" onClick={() => handleCancel(props)} className={css.button}>
                      Cancel
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default AdminProfile;