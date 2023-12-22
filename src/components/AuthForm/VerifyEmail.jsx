import React, { useState, useEffect } from 'react';
import axiosService from '../../helpers/axios';
import css from "./AuthForm.module.scss";

const VerifyEmail = ({verifyEmail, host}) => {
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
    const path = `${host}/pet-store`;

    if (resendAttempts > 0) {
      axiosService
        .post(`/auth/resend-verification-link?email=${verifyEmail}&path=${path}`)
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
      A confirmation message has been sent to your email address: <b>{verifyEmail}</b>. <br/>
      Please check your inbox (or spam folder) and click the confirmation link provided.
      </p>
      <p>
        If the message did not arrive, you can
        {isTimerActive ? (
          `try again in ${secondsRemaining} seconds`
        ) : (
          <>
            <br /><br />
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