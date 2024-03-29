import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import LogInForm from "../../components/AuthForm/LoginForm";
import { useState } from "react";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import VerifyEmail from "../../components/AuthForm/VerifyEmail";
import VerifyCheck from "../../components/AuthForm/VerifyCheck";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../redux/cards/selectors";
import { getAllCategories } from "../../redux/cards/operations";
import PasswordReset from "../../components/AuthForm/PasswordReset";

import { getUser } from "../../helpers/user.actions";
import Modal from "../../components/Modal/Modal";
import PasswordRecovery from "../../components/AuthForm/PasswordRecovery";
import {
  UserLoginLogoutSubscribe,
  UserLoginLogoutUnsubscribe,
} from "../../helpers/events/LoginLogout";
import Cart from "../../components/Cart/Cart";
import {
  CartAddEventSubscribe,
  CartAddEventUnSubscribe,
} from "../../helpers/events/CartEvent";
import FavoriteIconInHeader from "../../components/FavoriteIconInHeader/FavoriteIconInHeader";

const Header = () => {
  const token = new URLSearchParams(window.location.search).get("token");

  const { constants } = useConstants();
  const user = getUser();

  const [userIsLogined, setUserIsLogined] = useState(!!user);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState(null);

  const { content: categories, isLoading: categoriesIsLoading } =
    useSelector(selectAllCategories);
  const [showMenu, setShowMenu] = useState(false);
  const [openItems, setOpenItems] = useState([]);

  const dispatch = useDispatch();

  const modalTitles = {
    1: "Sign Up",
    2: "Email Verification",
    3: "Log in",
    4: "Verify Email Address",
    5: "Reset Password",
    6: "Password Recovery",
  };

  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const [productsQuantity, setProductsQuantity] = useState(
    Array.isArray(cartData)
      ? [...new Set(cartData.map((e) => e.product.id))]
      : []
  );

  useEffect(() => {
    function handleSomething(num) {
      console.log(num.detail.action, num.detail.ids);

      setProductsQuantity((prevQuantity) => {
        if (num.detail.action === "+") {
          return Array.from(new Set([...prevQuantity, ...num.detail.ids]));
        } else if (num.detail.action === "-") {
          return prevQuantity.filter((id) => !num.detail.ids.includes(id));
        } else if (num.detail.action === "exit") {
          return [];
        }

        return prevQuantity;
      });
    }
    CartAddEventSubscribe(handleSomething);

    return () => {
      CartAddEventUnSubscribe(handleSomething);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalState(null);
  };

  useEffect(() => {
    UserLoginLogoutSubscribe("UserLogin", () => setUserIsLogined(true));
    UserLoginLogoutSubscribe("UserLogout", () => setUserIsLogined(false));

    return () => {
      UserLoginLogoutUnsubscribe("UserLogin", () => setUserIsLogined(false));
      UserLoginLogoutUnsubscribe("UserLogout", () => setUserIsLogined(true));
    };
  }, []);

  useEffect(() => {
    if (token) {
      let inRegistration = JSON.parse(localStorage.getItem("userEmail"));
      toggleModal();
      setModalState(inRegistration.PawSomeRegistarion ? 4 : 6);
    }
  }, [token]);

  useEffect(() => {
    if (categoriesIsLoading || categories.length) return;
    dispatch(getAllCategories());
  }, [categoriesIsLoading, categories.length, dispatch]);

  const handleMouseEnter = (itemId, index) => {
    setOpenItems((prevOpen) => {
      if (typeof index === "number") {
        return [...prevOpen.slice(0, index + 1), itemId];
      }
      return [...prevOpen, itemId];
    });
  };

  const handleItemChange = (itemId, index) => {
    setOpenItems((prevOpen) => {
      if (typeof index === "number") {
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
              {item.name}
              <IoIosArrowForward />
            </NavLink>
          </li>
        ))}
    </ul>
  );
  console.log("user", user);
  console.log(constants);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.menu}>
            <NavLink to="/" className={styles.logo}>
            {constants && constants.length && constants[0].value && constants[0].value !== null && constants[0].value?.filePath ? (
              <img
                src={constants[0].value.filePath}
                alt={constants[0]?.key}
              />
            ) : ""}
            </NavLink>
            <div
              className={styles.catalogue}
              onClick={() => setShowMenu(true)}
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => {
                setShowMenu(false);
                setOpenItems([]);
              }}
            >
              <NavLink to={`/catalogue/All`} style={{ whiteSpace: "nowrap" }}>
                Catalogue{" "}
                <IoIosArrowDown size={16} style={{ verticalAlign: "middle" }} />
              </NavLink>
              {categories?.length > 0 && showMenu && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.horizontalList}>
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
                              style={
                                openItems.includes(item.id)
                                  ? { color: "#ffad4d" }
                                  : {}
                              }
                            >
                              {item.name}
                              <IoIosArrowForward />
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                    {openItems?.map((itemId, index) =>
                      parentExist(itemId, index)
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.search}>
              <input
                type="text"
                id="query"
                placeholder="Search the best in Pawsome "
              />
            </div>
          </div>

          <div className={styles.options}>
            {user?.role !== "ADMIN" && (
              <>
                <FavoriteIconInHeader />

                <div
                  onClick={() => {
                    toggleModal();
                    setModalState("Cart");
                  }}
                  className={styles.option}
                >
                  <FiShoppingCart size={32} />
                  {productsQuantity.length > 0 && (
                    <span className={styles.numberOfCartItemsWrapper}>
                      <span className={styles.numberOfCartItems}>
                        {productsQuantity.length}
                      </span>
                    </span>
                  )}
                </div>
              </>
            )}

            {user && userIsLogined ? (
              <NavLink
                to={user.role === "ADMIN" ? "/admin/orders" : "/user/account"}
                // to="/user/account"
                className={styles.option}
                style={{ backgroundColor: "#f4f6fa" }}
              >
                {user.firstName.charAt(0)
                  ? user.firstName.charAt(0)
                  : user.lastName.charAt(0)}
              </NavLink>
            ) : (
              <button
                type="button"
                className={`${styles.option} ${styles.option_btn}`}
                onClick={() => {
                  toggleModal();
                  setModalState(3);
                }}
              >
                <FaRegUser size={32} />
              </button>
            )}
          </div>
        </div>
      </header>

      {showModal &&
        (modalState === "Cart" ? (
          <Cart
            user={user}
            toggleModal={toggleModal}
            setModalState={setModalState}
            setProductsQuantity={setProductsQuantity}
            productsQuantity={productsQuantity}
          />
        ) : modalState === 4 ? (
          <VerifyCheck
            token={token}
            setModalState={setModalState}
            toggleModal={toggleModal}
          />
        ) : (
          <Modal onClose={toggleModal} title={modalTitles[modalState]}>
            {modalState === 1 && (
              <RegisterForm
                setModalState={setModalState}
                host={window.location.host}
              />
            )}
            {modalState === 2 && (
              <VerifyEmail
                host={window.location.host}
                setModalState={setModalState}
              />
            )}
            {modalState === 3 && (
              <LogInForm setModalState={setModalState} onClose={toggleModal} />
            )}
            {modalState === 5 && (
              <PasswordReset
                setModalState={setModalState}
                host={window.location.host}
              />
            )}
            {modalState === 6 && (
              <PasswordRecovery setModalState={setModalState} token={token} />
            )}
          </Modal>
        ))}
    </>
  );
};

export default Header;
