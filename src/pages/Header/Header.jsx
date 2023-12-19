import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import LogInForm from "../../components/AuthForm/LoginForm";
import { useState } from "react";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { fetchAllCategories } from "../../helpers/api";
import VerifyEmail from "../../components/AuthForm/VerifyEmail";
import VerifyCheck from "../../components/AuthForm/VerifyCheck";

const Header = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');

  const { constants } = useConstants();
  const isLoggedIn = false;

  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const [categories, setCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [openItems, setOpenItems] = useState([]);

  const modalTitles = {
    1: "Sign Up",
    2: "Email verification",
    3: "Log in",
    4: "User verification",
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalState(null);
  };

  useEffect(() => {
    if (token) {
      toggleModal();
      setModalState(4);
    }
  }, [token]);

  useEffect(() => {
    fetchAllCategories()
      .then(setCategories)
      .catch(error => console.log('Error', error))
  }, [])

  const handleMouseEnter = (itemId, index) => {
    setOpenItems((prevOpen) => {
      if (typeof index === 'number') {
        return [...prevOpen.slice(0, index + 1), itemId];
      }
      return [...prevOpen, itemId];
    });
  };
  
  const handleItemChange = (itemId, index) => {
    setOpenItems((prevOpen) => {
      if (typeof index === 'number') {
        return prevOpen.slice(0, index + 1);
      }
      return [];
    });
  };
  
  const parentExist = (itemId, index) => (
    <ul key={index}>
      {categories
        .filter((item) => item.parent?.id === itemId)
        .map((item) => (
          <li 
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id, index)}
            onChange={() => handleItemChange(item.id, index)}
            
          >
            <NavLink 
              to={`/catalogue/${item.name}-${item.id}`} 
              style={openItems.includes(item.id) ? { color: "#ffad4d" } : {}}
            >
              {item.name}<IoIosArrowForward /> 
            </NavLink>
          </li>
        ))}
    </ul>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.menu}>
            <NavLink to="/" className={styles.logo}>
              <img src={constants[0].value.filePath} alt={constants[0]?.key} />
            </NavLink>
            <div
              className={styles.catalogue}
              onClick={() => setShowMenu(true)}
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => {setShowMenu(false); setOpenItems([])}}
              >
              <NavLink to={`/catalogue/All`}>
                Catalogue{" "}
                <IoIosArrowDown size={16} style={{ verticalAlign: "middle" }} />
              </NavLink>
              {categories?.length > 0 && showMenu && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.horizontalList} >
                    <ul>
                      {categories
                        .filter((item) => item.parent === null)
                        .map((item) => (
                          <li
                            key={item.id}
                            onMouseEnter={() => setOpenItems([item.id])}
                            onChange={() => setOpenItems([])}
                          >
                            <NavLink 
                              to={`/catalogue/${item.name}-${item.id}`} 
                              style={openItems.includes(item.id) ? { color: "#ffad4d" } : {}}
                            >
                              {item.name}<IoIosArrowForward />
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                    {openItems?.map((itemId, index) => parentExist(itemId, index))}
                  </div>
                </div>
              )}
            </div>
            
            <NavLink to="/admin/orders" className={styles.catalogue}>
              Admin
            </NavLink>
            <div className={styles.search}>
              <input
                type="text"
                id="query"
                placeholder="Search the best in Pawsome "
              />
            </div>
          </div>

          <div className={styles.options}>
            <NavLink to="/favorites" className={styles.option}>
              <FaRegHeart size={32} />
            </NavLink>

            <NavLink to="/cart" className={styles.option}>
              <FiShoppingCart size={32} />
            </NavLink>

            {isLoggedIn ? (
              <NavLink to="/user/account" className={styles.option}>
                <FaRegUser size={32} />
              </NavLink>
            ) : (
              <button
                type="button"
                className={`${styles.option} ${styles.option_btn}`}
                onClick={() => {toggleModal(); setModalState(3)}}
              >
                <FaRegUser size={32} />
              </button>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <Modal onClose={toggleModal} title={modalTitles[modalState]}>
          {modalState === 1 && (
            <RegisterForm
              onClick={(email) => {setVerifyEmail(email); setModalState(2)}}
              setModalState={setModalState}
              host={window.location.host}
            />
          )}
          {modalState === 2 && (
            <VerifyEmail
              verifyEmail={verifyEmail}
            />
          )}
          {modalState === 3 && (
            <LogInForm
              setModalState={setModalState}
              onClose={toggleModal}
            />
          )}
          {modalState === 4 && (
            <VerifyCheck
              token={token}
              setModalState={setModalState}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default Header;