import React, { useCallback, useEffect, useState } from "react";
import axiosService from "../../helpers/axios";
import css from "./AuthForm.module.scss";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

const VerifyCheck = ({ token, setModalState, toggleModal }) => {
  const [error, setError] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const [isLoading, setIsLoading] = useState(false);

  console.log(userEmail);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const rightToken = token.replace(/\s/g, "");
      await axiosService
        .post(`/auth/verify-email?token=${rightToken}`)
        .then(() => {
          localStorage.removeItem("userEmail");
        });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  return isLoading ? (
    <Modal
      onClose={toggleModal}
      title={"Verify Email Address"}
      disabledBack={true}
    >
      <Loader />
    </Modal>
  ) : (
    <Modal
      onClose={toggleModal}
      title={error ? "Error Verification" : "Verify Email Address"}
    >
      <div className={css.verifyBlock}>
        {error ? (
          <>
            <button
              className={css.openError}
              onClick={() => setIsErrorOpen(!isErrorOpen)}
            >
              {isErrorOpen ? "Close " : "Open "} Error
            </button>
            {isErrorOpen && <p>{error}</p>}
            <p>
              Something went wrong while the verification request to your email was being processed {userEmail?.email}{" "}
              <span className={css.change} onClick={() => setModalState(1)}>
                (Change)
              </span>
            </p>
            <button className={css.button} onClick={handleRetry}>
              Resend verification link
            </button>
          </>
        ) : (
          <>
            <p style={{fontSize: "large"}}>Account successfully registered, please login!</p>
            <button onClick={() => setModalState(3)} className={css.button}>
              Switch to Log In form
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default VerifyCheck;
