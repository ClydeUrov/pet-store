import React, { useState, useEffect } from 'react';
import axiosService from '../../helpers/axios';
import css from "./AuthForm.module.scss";

const VerifyEmail = ({host, setModalState}) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

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
      .post(`/auth/resend-verification-link?email=${userEmail}&path=${path}`)
      .catch((err) => {
        err.response ? setError(err.response.data.message) : setError("Error resending verification link.");
      });

    startTimer();
  };

  return (
    <div className={css.verifyBlock}>
      <p>
        To verify your email, we've sent a link to <b>{userEmail}</b>{" "}
        <span style={{ color: "blue", cursor: 'pointer' }} onClick={() => setModalState(1)}>(Change)</span>
        <br />
        Please check your inbox (or spam folder) and click on the provided confirmation link.
      </p>
      {error && (
        <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
      )}
      <p>
        If the message did not arrive, you can
        {isTimerActive ? (
          `try again in ${secondsRemaining} seconds`
        ) : (
          <>
            <br /><br />
            <button
              className={css.button}
              onClick={handleResend}
            >
              Send again
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default VerifyEmail;