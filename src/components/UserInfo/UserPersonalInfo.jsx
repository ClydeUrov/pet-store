import css from "./UserInfo.module.scss";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { useFormik } from "formik";
import { schemaUserPersonalInfoNew } from "../../helpers/schemes";
import { getUser } from "../../helpers/user.actions";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const UserPersonalInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleReset } = useFormik(
    {
      initialValues: { ...getUser(), password: "12312312" },
      validationSchema: schemaUserPersonalInfoNew,
      onSubmit: function (e) {
        console.log(e, "SUBMIT");
        toggleDisabled();
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
          className={
            css.inputElem + " " + `${errors.firstName ? css.errInp : ""}`
          }
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
          className={
            css.inputElem + " " + `${errors.lastName ? css.errInp : ""}`
          }
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
          className={css.inputElem + " " + `${errors.email ? css.errInp : ""}`}
          name="email"
          type="email"
          value={values.email}
          disabled={disabled}
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
            <label className={css.lblFroInput} htmlFor="passwordInp">
              New password
            </label>
            {errors.password && (
              <p className={css.errorMess}>{errors.password}</p>
            )}

            <div className={css.passwordCont}>
              <input
                id="passwordInp"
                className={
                  css.inputElem +
                  " " +
                  css.passwordInp +
                  " " +
                  `${errors.password ? css.errInp : ""}`
                }
                name="password"
                type={passwordShow ? "text" : "password"}
                disabled={disabled}
                onChange={handleChange}
                required
              />
              <i onClick={() => setPasswordShow((st) => !st)}>
                {!passwordShow ? (
                  <FaRegEye size={28} />
                ) : (
                  <FaRegEyeSlash size={28} />
                )}
              </i>
            </div>
            <label className={css.lblFroInput} htmlFor="passwordInpConf">
              Confirm new password
            </label>
            {errors.confirm && (
              <p className={css.errorMess}>{errors.confirm}</p>
            )}

            <div className={css.passwordCont}>
              <input
                name="confirm"
                className={
                  css.inputElem + " " + `${errors.confirm ? css.errInp : ""}`
                }
                id="passwordInpConf"
                type={confirmPasswordShow ? "text" : "password"}
                // value={values.confirm}
                disabled={disabled}
                onChange={handleChange}
                required
              />
              <i onClick={() => setConfirmPasswordShow((st) => !st)}>
                {!confirmPasswordShow ? (
                  <FaRegEye size={28} />
                ) : (
                  <FaRegEyeSlash size={28} />
                )}
              </i>
            </div>
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
