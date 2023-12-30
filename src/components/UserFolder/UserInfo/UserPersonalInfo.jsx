import css from "./UserInfo.module.scss";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { useFormik } from "formik";
import { schemaUserPersonalInfoNew } from "../../../helpers/schemes";
import { getUser, useUserActions } from "../../../helpers/user.actions";
import { toast } from "react-toastify";

export const UserPersonalInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const { editProfile } = useUserActions();
  const user = getUser();
  console.log(user, "USER!!!!");

  const { values, errors, handleChange, handleSubmit, handleReset } = useFormik(
    {
      initialValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      validationSchema: schemaUserPersonalInfoNew,
      onSubmit: function (e) {
        try {
          console.log(e, "SUBMIT");
          toast.promise(
            editProfile(
              {
                firstName: values.firstName,
                lastName: values.lastName,
              },
              {
                ...user,
                firstName: values.firstName,
                lastName: values.lastName,
              }
            ),
            {
              pending: "Personal information changing in progress",
              success: "Personal information was changed",
              error: "Personal information not change, try again",
            }
          );
        } catch (e) {
          console.log(e);
        } finally {
          toggleDisabled();
        }
      },
    }
  );

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleCancel = () => {
    handleReset();
    toggleDisabled();
    return;
  };

  return (
    <>
      <h3 className={css.title}>Personal information</h3>

      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.lblFroInput} htmlFor="firstNameInp">
          First Name
        </label>
        {errors.firstName && (
          <p className={css.errorMess}>{errors.firstName}</p>
        )}
        <input
          className={css.inputElem + ` ${errors.firstName ? css.errInp : ""}`}
          id="firstNameInp"
          name="firstName"
          type="text"
          disabled={disabled}
          value={values.firstName}
          onChange={handleChange}
          required
        />

        <label className={css.lblFroInput} htmlFor="lstNameInp">
          Surname
        </label>
        {errors.lastName && <p className={css.errorMess}>{errors.lastName}</p>}

        <input
          id="lstNameInp"
          className={css.inputElem + ` ${errors.lastName ? css.errInp : ""}`}
          name="lastName"
          type="text"
          value={values.lastName}
          disabled={disabled}
          onChange={handleChange}
          required
        />
        <label className={css.lblFroInput} htmlFor="emailInp">
          E-mail
        </label>
        {errors.email && <p className={css.errorMess}>{errors.email}</p>}

        <input
          id="emailInp"
          className={css.inputElem + ` ${errors.email ? css.errInp : ""}`}
          name="email"
          type="email"
          value={values.email}
          disabled={true}
          onChange={handleChange}
          required
        />

        {disabled ? (
          <button type="button" onClick={toggleDisabled} className={css.button}>
            Edit
            <GoPencil size={20} className={css.btn__icon} />
          </button>
        ) : (
          <>
            <ul className={css.list__btn}>
              <li className={css.item__btn}>
                <button type="submit" className={css.button}>
                  Confirm
                </button>
              </li>
              <li className={css.item__btn}>
                <button
                  type="button"
                  onClick={() => handleCancel()}
                  className={css.button}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </>
        )}
      </form>
    </>
  );
};
