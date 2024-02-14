import React, { useState } from "react";
import { useConstants } from "../../../helpers/routs/ConstantsProvider";
import { NavLink } from "react-router-dom";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import css from "./LeftSide.module.scss";
import Modal from "../../Modal/Modal";
import LogOutForm from "../../AuthForm/LogOutForm";

const LeftSide = () => {
  const [activeItem, setActiveItem] = useState({href: "orders", text: "Orders"});
  const [isContentListOpen, setIsContentListOpen] = useState(false);
  const { constants } = useConstants();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  console.log(constants);

  const navItems = [
    { href: "orders", text: "Orders" },
    { href: "content", text: "Content" },
    { href: "users", text: "Users" },
    { href: "settings", text: "Settings"},
    { href: "account", text: "My profile" },
    { href: "logout", text: "Log out" },
  ];

  const contentItems = [
    { href: "products", text: "Products", },
    { href: "categories", text: "Categories"},
    { href: "brands", text: "Brands"},
    { href: "materials", text: "Materials"},
    { href: "colors", text: "Colors"},
    { href: "weights", text: "Weights"},
    { href: "ages", text: "Ages"},
    { href: "sizes", text: "Sizes"},
    { href: "prescriptions", text: "Prescriptions"},
  ];

  return (
    <div>
      <NavLink to="/" className={css.logo}>
        {constants && constants.length &&
          constants[0].value &&
          constants[0].value?.filePath && (
            <img
              src={constants[0].value.filePath}
              alt={constants[0]?.key}
            />
          )}
      </NavLink>
      <div className={css.list}>
        {navItems.map(({ href, text }) => (
          <div key={href}>
            {href === "content" ? (
              <div
                className={
                  href === activeItem.href
                    ? `${css.activeItem} ${css.content}`
                    : `${css.content}`
                }
                onClick={() => {
                  setActiveItem({ href, text });
                }}
              >
                <div
                  onClick={() => {
                    setIsContentListOpen(
                      (prevIsContentListOpen) => !prevIsContentListOpen
                    );
                  }}
                >
                  <p>{text}</p>
                  <span>
                    {isContentListOpen ? <AiOutlineDown /> : <AiOutlineRight />}
                  </span>
                </div>
                {isContentListOpen && (
                  <ul className={css.contentList}>
                    {contentItems.map((contentItem) => (
                      <li key={contentItem.href}>
                        <NavLink to={contentItem.href}>
                          {contentItem.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : href === "logout" ? (
              <span onClick={toggleModal} className={css.logout}>
                <FiLogOut style={{ marginRight: "10px" }} /> {text}
              </span>
            ) : (
              <NavLink
                className={href === activeItem.href ? css.activeItem : ""}
                to={href}
                onClick={() => setActiveItem({ href, text })}
              >
                <p>{text}</p>
              </NavLink>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <LogOutForm />
        </Modal>
      )}
    </div>
  );
};

export default LeftSide;
