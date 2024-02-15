import { useState } from "react";
import { Form, Formik } from "formik";
import css from "./AdminProfile.module.scss";
import FormikField from "../../FormikFolder/FormikField";
import { schemaAdminInformation, schemaAdminPassword } from "../../../helpers/schemes";
import { GoPencil } from "react-icons/go";
import { getUser, useUserActions } from "../../../helpers/user.actions";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const user = getUser();
  const { editProfile, editPassword } = useUserActions();
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
    console.log(formData, formName);
    if (!editState.personalInfo) {
      try {
        await toast.promise(
          editProfile(
            {
              firstName: formData.firstName,
              lastName: formData.lastName,
            },
            {
              ...user,
              firstName: formData.firstName,
              lastName: formData.lastName,
            }
          ),
          {
            pending: "Personal information changing in progress",
            success: "Personal information was changed",
            error: "Personal information not changed, try again",
          }
        );
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    } else {
      try {
        await toast.promise(
          editPassword({
            email: user.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
          {
            pending: "Password changing in progress",
            success: "Password was changed",
            error: "Password not change, try again",
          }
        );
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
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
          lastName: user.lastName,
          email: user.email,
          firstName: user.firstName,
        }}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Form className={css.form}>
            <FormikField
              name="firstName"
              type="text"
              label="First name"
              width="276px"
              onChange={(e) => {form.handleChange(e)}}
              disabled={editState.personalInfo}
              required
            />
            <FormikField
              name="lastName"
              type="text"
              label="Last name"
              width="276px"
              onChange={(e) => {form.handleChange(e)}}
              disabled={editState.personalInfo}
              required
            />
            <FormikField
              name="email"
              type="text"
              disabled="true"
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
          currentPassword: "",
          newPassword: "",
          confirm: "",
        }}
        onSubmit={(values, form) => handleSubmit(values, 'passwordInfo', form)}
      >
        {(form) => (
          <Form className={css.form}>
            <h3 style={{marginBottom:"20px"}}>Your password</h3>
            <FormikField
              name="currentPassword"
              type="password"
              label="Current password"
              width="276px"
              // value={form.values.currentPassword}
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
              <>
                <FormikField
                  name="newPassword"
                  type="password"
                  label="New password"
                  width="276px"
                  // value={form.values.newPassword}
                  disabled={editState.passwordInfo}
                  required
                />
                <FormikField
                  name="confirm"
                  type="password"
                  label="Confirm new password"
                  width="276px"
                  // value={form.values.confirm}
                  disabled={editState.passwordInfo}
                  required
                />
                <div className={css.submitForm}>
                  <button type="submit" className={css.button} disabled={form.isSubmitting}>
                    Confirm
                  </button>
                  <button type="button" onClick={() => handleCancel(form, 'passwordInfo')} className={css.button}>
                    Cancel
                  </button>
                </div>
              </>
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