
// import { useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";
//import { useSelector } from 'react-redux';

import css from "./AuthForm.module.scss";


const LogOutForm = () => {
   const navigate = useNavigate();
  // const dispatch = useDispatch();


  const handleSubmit = async () => {
    console.log("exit");
    navigate('/');
    return;
  };

  return (
    <>
    <h3 className={css.logout__title}>Log Out</h3>
    <p className={css.logout__text}>Are you sure you want to log out?</p>
      <button type="submit" className={css.logout__button} onClick={handleSubmit}>Confirm</button>  
    </> 
            
  );
};

export default LogOutForm;