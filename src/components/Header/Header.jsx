import React from 'react'
import styles from './Header.module.scss'
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom'
import Logo from '../../icons/logo'
import Modal from '../Modal/Modal'
import RegisterForm from '../AuthForm/RegisterForm'
import LogInForm from '../AuthForm/LoginForm'
import { useState } from 'react';


const Header = () => {
  const isLoggedIn = false;
  const [showModal, setShowModal] = useState(false);
  const [registerOrLogInForms, setRegisterOrLogInForms] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleRegisterOrLogInForms = () => {
    setRegisterOrLogInForms(!registerOrLogInForms);
  };


  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.menu}>
            <NavLink to="/" className={styles.logo}>
              <Logo />
            </NavLink>
            <NavLink to="/catalogue/all" className={styles.catalogue}>
              Catalogue
            </NavLink>
            <div className={styles.search}>
              <input type="text" id="query" placeholder="Search the best in Pawsome " />
            </div>
          </div>

          <div className={styles.options}>
            <NavLink to="/favorites" className={styles.option}>

              <FaRegHeart size={32} />

            </NavLink>

            <NavLink to="/cart" className={styles.option}>
              <FiShoppingCart size={32} />
            </NavLink>

            {isLoggedIn ? (<NavLink to="/user/account" className={styles.option}>
              <FaRegUser size={32} />
            </NavLink>
            ) : (
              <button type='button' className={`${styles.option} ${styles.option_btn}`} onClick={() => toggleModal()}>

                <FaRegUser size={32} />

              </button>)}
          </div>
        </div>
      </header>


      {
        registerOrLogInForms ? (showModal &&
          <Modal onClose={toggleModal} title={'Sign Up'}   >
            <RegisterForm onClick={toggleRegisterOrLogInForms} onClose={toggleModal} />
          </Modal>
        ) : (showModal &&
          <Modal onClose={toggleModal} title={'Log in'}   >
            <LogInForm onClick={toggleRegisterOrLogInForms} onClose={toggleModal} />
          </Modal>
        )
      }


    </>
  )
}

export default Header
