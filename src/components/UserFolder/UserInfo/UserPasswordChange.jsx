import { useState } from "react";
import styles from "./UserPasswordChange.module.scss";
import css from "./UserInfo.module.scss";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { schemaUserPassword } from "../../../helpers/schemes";
import { getUser, useUserActions } from "../../../helpers/user.actions";
import { toast } from "react-toastify";

function UserPasswordChange() {
  const [showPassMenu, setShowPassMenu] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const { editPassword } = useUserActions();
  const { email } = getUser();
  console.log(email);

  const {
    values,
    errors,
    handleSubmit,
    handleReset,
    handleChange,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirm: "",
    },
    validationSchema: schemaUserPassword,
    onSubmit: function (e) {
      if (values.password === values.oldPassword)
        throw new Error("New password must be different from old");
      if (values.password === values.confirm)
        toast.promise(
          editPassword({
            email,
            currentPassword: values.oldPassword,
            newPassword: values.password,
          }),
          {
            pending: "Password changing in progress",
            success: "Password was changed",
            error: "Password not change, try again",
          }
        );
      handleCancel();
    },
  });

  function handleCancel() {
    setShowPassMenu(false);
    handleReset();
  }
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      {!showPassMenu ? (
        <button
          className={styles.button}
          onClick={() => setShowPassMenu((e) => !e)}
        >
          Change Password
        </button>
      ) : (
        <>
          <label className={css.lblFroInput} htmlFor="passwordInpOld">
            Old password
          </label>
          {errors.oldPassword && touched.oldPassword ? (
            <p className={css.errorMess}>{errors.oldPassword}</p>
          ) : (
            ""
          )}

          <div className={css.passwordCont}>
            <input
              onChange={handleChange}
              id="passwordInpOld"
              onBlur={handleBlur}
              className={
                css.inputElem +
                " " +
                css.passwordInp +
                " " +
                `${errors.password ? css.errInp : ""}`
              }
              name="oldPassword"
              value={values.oldPassword}
              type={showOldPass ? "text" : "password"}
              required
            />
            <i onClick={() => setShowOldPass((st) => !st)}>
              {!showOldPass ? (
                <FaRegEye size={28} />
              ) : (
                <FaRegEyeSlash size={28} />
              )}
            </i>
          </div>
          <label className={css.lblFroInput} htmlFor="passwordInp">
            New password
          </label>
          {errors.password && touched.password ? (
            <p className={css.errorMess}>{errors.password}</p>
          ) : (
            ""
          )}

          <div className={css.passwordCont}>
            <input
              onChange={handleChange}
              id="passwordInp"
              onBlur={handleBlur}
              className={
                css.inputElem +
                " " +
                css.passwordInp +
                " " +
                `${errors.password ? css.errInp : ""}`
              }
              name="password"
              value={values.password}
              type={passwordShow ? "text" : "password"}
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
          {errors.confirm && touched.confirm ? (
            <p className={css.errorMess}>{errors.confirm}</p>
          ) : (
            ""
          )}

          <div className={css.passwordCont}>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirm"
              className={css.inputElem + ` ${errors.confirm ? css.errInp : ""}`}
              id="passwordInpConf"
              type={confirmPasswordShow ? "text" : "password"}
              value={values.confirm}
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
                className={css.button}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </li>
          </ul>
        </>
      )}
    </form>
  );
}

export default UserPasswordChange;
