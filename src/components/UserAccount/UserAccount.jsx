import css from "./UserAccount.module.scss";
// import { useState, useEffect } from 'react';
import UserOrdersNew from "../UserOrdersNew/UserOrdersNew";
import { Link } from "react-router-dom";
import { GoPencil } from 'react-icons/go';


export const user = {
  name: "Name",
  surname: "User",
  email: "maladoipacan@gmail.com",

  country: "Ukr",
  region: "Kyivska Oblast’",
  city: "Kyiv",
  code: "61000",
  street: "Adamovycha",
  building: "20/32",
  flat: "",
};

// firstName: "",
// lastName: "",

// name: "qwe",
// surname: "qwe",
// email: "",
// password: "qweqweqwe",
// confirm: "qweqweqwe",

// country: "",
// region: "",
// city: "",
// code: "",
// street: "",
// building: "",
// flat: "",

const UserAccount = () => {
  return (
    <>
      <h3 className={css.title}>Hello, {user.name}!</h3>

      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.user__name}>
            {user.name} {user.surname}
          </p>
          <Link to="/user/info" className={css.icon}>
            <GoPencil size={24} />
          </Link>
        </li>
        <li className={css.item}>
          <p>E-mail</p>
          <p className={css.user__info}>{user.email}</p>
        </li>
        <li className={css.item}>
          <p>Delivery information</p>
          <p className={css.user__info}>
            <span>{user.country}, </span>
            <span>{user.region}, </span>
            <span>{user.city}, </span>
            <span>{user.street}, </span>
            <span>{user.building}, </span>
            {user.flat ? <span>{user.flat}, </span> : null}
            <span>{user.code} </span>
          </p>
        </li>
      </ul>

      <UserOrdersNew />
    </>
  );
};

export default UserAccount;