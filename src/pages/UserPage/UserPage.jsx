import css from "./UserPage.module.scss";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import LogOutForm from "../../components/AuthForm/LogOutForm";

import { NavLink } from "react-router-dom";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const UserPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const navItems = [
    { href: "account", text: "My account" },
    { href: "info", text: "Personal information" },
    { href: "orders", text: "My orders" },
    { href: "reviews", text: "My reviews" },
  ];

  return (
    <>
      <div className={css.container}>
        <ul className={css.list}>
          {navItems.map(({ href, text }) => (
            <li className={css.item} key={href}>
              <NavLink to={href} className={css.link}>
                {" "}
                {text}
              </NavLink>
            </li>
          ))}
          <li className={css.item}>
            <button
              type="button"
              onClick={() => toggleModal()}
              className={`${css.link} ${css.link_btn}`}
            >
              {" "}
              Exit account
            </button>
          </li>
        </ul>

        <div className={css.outlet}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <LogOutForm />
        </Modal>
      )}
    </>
  );
};

export default UserPage;
