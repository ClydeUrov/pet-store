import { useState } from "react";
import { Form, Formik } from "formik";
import css from "./AdminProfile.module.scss";
import FormikField from "../../FormikFolder/FormikField";
import { schemaAdminInformation, schemaAdminPassword } from "../../../helpers/schemes";
import { GoPencil } from "react-icons/go";
import { getUser, useUserActions } from "../../../helpers/user.actions";

const AdminProfile = () => {
  const user = getUser();
  const userAction = useUserActions();
  const [error, setError] = useState('');
  const [editState, setEditState] = useState({
    personalInfo: true,
    passwordInfo: true,
  });

  const toggleEditState = (formName) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [formName]: !prevEditState[formName],
    }));
  };

  const handleCancel = (form, formName) => {
    form.handleReset();
    toggleEditState(formName);
  };

  const handleSubmit = async (formData, formName) => {
    if (!editState.personalInfo) {
      const userInfo = {
        name: formData.name,
        surname: formData.surname,
      };
      await userAction
        .editProfile(userInfo)
        .then()
        .catch((e) => {
          e.response ? setError(e.response.data.message) : setError(e.message)
        })
    } else {
      const passwordInfo = {
        password: formData.password,
        confirm: formData.confirm,
      };
      await userAction
        .editPassword(passwordInfo)
        .then()
        .catch((e) => {
          e.response ? setError(e.response.data.message) : setError(e.message)
        })
    }

    toggleEditState(formName);
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Admin information</p>
      </div>
      <div className={css.formContainer}>
      <Formik
        validationSchema={schemaAdminInformation}
        initialValues={{
          surname: user.lastName,
          email: user.email,
          name: user.firstName,
        }}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Form className={css.form}>
            <FormikField
              name="name"
              type="text"
              label="Name"
              width="276px"
              onChange={(e) => {form.handleChange(e)}}
              disabled={editState.personalInfo}
              required
            />
            <FormikField
              name="surname"
              type="text"
              label="Surname"
              width="276px"
              onChange={(e) => {form.handleChange(e)}}
              disabled={editState.personalInfo}
              required
            />
            <FormikField
              name="email"
              type="unstyled"
              label="E-mail"
              width="276px"
              value={user.email}
            />
            {editState.personalInfo ? (
              <button
                type="button"
                onClick={() => toggleEditState('personalInfo')}
                className={css.button}
              >
                Edit <GoPencil size={20} style={{marginLeft: "5px"}} />
              </button>
            ) : (
              <div className={css.submitForm}>
                <button type="submit" className={css.button}>
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => handleCancel(form, 'personalInfo')}
                  className={css.button}
                >
                  Cancel
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <Formik
        validationSchema={schemaAdminPassword}
        initialValues={{
          password: "",
          confirm: "",
          editEnabled: false,
        }}
        onSubmit={(values, form) => handleSubmit(values, 'passwordInfo', form)}
      >
        {(form) => (
          <Form className={css.form}>
            <h3 style={{marginBottom:"20px"}}>Your password</h3>
            <FormikField
              name="password"
              type="password"
              label="Password"
              width="276px"
              value={form.values.password}
              disabled={editState.passwordInfo}
              required
            />
            <FormikField
              name="confirm"
              type="password"
              label="Confirm password"
              width="276px"
              value={form.values.confirm}
              disabled={editState.passwordInfo}
              required
            />

            {editState.passwordInfo ? (
              <button 
                type="button" 
                onClick={() => toggleEditState('passwordInfo')} 
                className={css.button}
              >
                Edit
                <GoPencil size={20} style={{marginLeft: "5px"}} />
              </button>
            ) : (
              <div className={css.submitForm}>
                <button type="submit" className={css.button} disabled={form.isSubmitting}>
                  Confirm
                </button>
                <button type="button" onClick={() => handleCancel(form, 'passwordInfo')} className={css.button}>
                  Cancel
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AdminProfile;