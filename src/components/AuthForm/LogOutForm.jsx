import css from "./AuthForm.module.scss";
import { useUserActions } from "../../helpers/user.actions";
import { useState } from "react";

const LogOutForm = () => {
  const [error, setError] = useState("");
  const userAction = useUserActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await userAction.logout();
    } catch (err) {
      err.response
        ? setError(err.response.data.message)
        : setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  //   await userAction.logout().catch((err) => {
  //     err.response
  //       ? setError(err.response.data.message)
  //       : setError(err.message);
  //   });
  // };

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
        className={`${css.logout__button} ${
          !isLoading ? css.active : css.disabled
        }`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Confirm
      </button>
    </>
  );
};

export default LogOutForm;
