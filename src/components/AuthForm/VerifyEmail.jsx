import React, { useState, useEffect } from "react";
import axiosService from "../../helpers/axios";
import css from "./AuthForm.module.scss";

const VerifyEmail = ({ host, setModalState }) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [error, setError] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const startTimer = () => {
    setIsTimerActive(true);
    setSecondsRemaining(60);
  };

  useEffect(() => {
    let timer;

    if (isTimerActive && secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else {
      setIsTimerActive(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTimerActive, secondsRemaining]);

  const handleResend = () => {
    const path = `${host}/pet-store`;

    axiosService
      .post(`/auth/resend-verification-link?email=${userEmail.email}&path=${path}`)
      .catch((err) => {
        err.response
          ? setError(err.response.data.message)
          : setError("Error resending verification link.");
      });

    startTimer();
  };

  return (
    <div className={css.verifyBlock}>
      {userEmail.message ? (
        <div>
          {userEmail.message}. <br />The message was sent to{' '}
          <b>{userEmail.email}</b>{' '}
          <span className={css.change} onClick={() => setModalState(1)} >
            (Change)
          </span>
          <br /><br />
          {isTimerActive && !error && (
            `If the message did not arrive, try again in ${secondsRemaining} seconds`
          )}
          {error && <p className={css.errorMes}>{error}</p>}
          {!error && (
            <button className={css.button} onClick={handleResend}>
              Send verification link
            </button>
          )}
        </div>
      ) : userEmail.email ? (
        <div style={{fontSize: "large"}}>
          To verify your email, we've sent a link to <b>{userEmail.email}</b>{" "}
          <span className={css.change} onClick={() => setModalState(1)} >
            (Change)
          </span>
          <br /><br />
          Please check your inbox (or spam folder) and click on the provided
          confirmation link.
          <br />
          {isTimerActive && !error && (
            `If the message did not arrive, try again in ${secondsRemaining} seconds`
          )}
          {error && <p className={css.errorMes}>{error}</p>}
          {!error && (
            <>
              <br />
              <button className={css.button} onClick={handleResend}>
                Send again
              </button>
            </>
          )}
        </div>
      ) : (
        <div>
          {userEmail?.message} {' '}The message was sent to{' '}
          {userEmail?.email ? userEmail?.email : "your e-male"}{' '}
          <span className={css.change} onClick={() => setModalState(1)} >
            (Change email)
          </span>
          <br /><br />
          {isTimerActive && !error && (
            `If the message did not arrive, try again in ${secondsRemaining} seconds`
          )}
          {error && <p className={css.errorMes}>{error}</p>}
          {!error && (
            <button className={css.button} onClick={handleResend}>
              Send verification link
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
