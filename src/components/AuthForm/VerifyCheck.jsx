import React, { useCallback, useEffect, useState } from 'react'
import axiosService from '../../helpers/axios';
import Loader from '../Loader/Loader';
import css from "./AuthForm.module.scss";

const VerifyCheck = ({token, setModalState}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchData = useCallback(async () => {
		console.log(22)
    try {
      await axiosService.post(`/auth/verify-email?token=${token}`);
      setModalState(3);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [token, setModalState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

	const handleRetry = () => {
		console.log(11)
    setError(null);
    setLoading(true);
    fetchData();
  };

  return (
    <div className={css.verifyBlock}>
			{loading && <p>Please wait for data transfer..</p>}
      {!loading && error && (
        <div>
          <p>{error}</p>
          <button
						className={css.button} 
						style={{padding: "10px 10px", margin: "10px"}} 
						onClick={handleRetry}
					>
						Try again
					</button>
        </div>
      )}
		</div>
  )
}

export default VerifyCheck;