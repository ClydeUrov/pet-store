import React, { useState, useEffect } from 'react';
import axiosService from '../../helpers/axios';
import css from "./AuthForm.module.scss";

const VerifyEmail = ({verifyEmail}) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(5);
  const [error, setError] = useState(null);

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
    if (resendAttempts > 0) {
      axiosService
        .post(`/auth/resend-verification-link?email=${verifyEmail}`)
        .catch((err) => {
          err.response ? setError(err.response.data.message) : setError(err.message);
        })
      startTimer();
      setResendAttempts(resendAttempts - 1);
    }
  };

  return (
    <div className={css.verifyBlock}>
      <p>
      A confirmation message has been sent to your email address {verifyEmail}. <br/>
      Kindly peruse your inbox (or spam folder) and proceed by clicking the provided link to validate.
      </p>
      <p>
        If the message did not arrive, you can
      </p>
      <p>
      {isTimerActive ? (
          `try again in ${secondsRemaining} seconds`
        ) : (
          <>
            {resendAttempts > 0 ? (
              <button 
                className={css.button} 
                style={{padding: "10px 10px", margin: "0px"}} 
                onClick={handleResend}
              >
                Send again
              </button>
            ) : (
              <span>Out of attempts</span>
            )}
          </>
        )}
      </p>
      {error && (
        <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
      )}
      <span>Remaining attempts: {resendAttempts}</span>
    </div>
  );
};

export default VerifyEmail;