import css from "./AuthForm.module.scss";
import { useUserActions } from "../../helpers/user.actions";
import { useState } from "react";
import { useUserContext } from "../../helpers/routs/UserLoginedContext";

const LogOutForm = () => {
  const userContext = useUserContext();
  const setUserLogined = userContext?.setUserLogined;

  const [error, setError] = useState('');
  const userAction = useUserActions();

  const handleSubmit = async () => {
    console.log(123);
    await userAction
      .logout()
      .then(() => setUserLogined?.(false))
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError(err.message)
      })
  };

  return (
    <>
      <h3 className={css.logout__title}>Log Out</h3>
      <p className={css.logout__text}>
        {error
          ? "Something went wrong please, try again"
          : "Are you sure you want to log out?"}
      </p>
      <button
        type="submit"
        className={css.logout__button}
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </>
  );
};

export default LogOutForm;
