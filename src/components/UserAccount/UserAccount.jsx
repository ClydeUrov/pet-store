import css from "./UserAccount.module.scss";
// import { useState, useEffect } from 'react';
import UserOrdersNew from "../UserOrdersNew/UserOrdersNew";
import { Link } from "react-router-dom";
import { GoPencil } from 'react-icons/go';
import axiosService, { fetcher } from "../../helpers/axios";
import { useUserActions } from "../../helpers/user.actions";
import { useEffect, useState } from "react";
import axios from "axios";


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
  const userAction = useUserActions();
  const [userr, setUser] = useState({});

  // const use = fetcher("/users/profile")
  const config = {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXdzb21lLmVzaG9wQGdtYWlsLmNvbSIsImlzcyI6Im9ubGluZS56b28uc3RvcmU6UGF3U29tZSIsImlhdCI6MTcwMjQ3NDAyMywiZXhwIjoxNzAyNTYwNDIzfQ.tzIxDBvLtSkW8mQRWB7ibHxmEfqgEq25e9CDPVUS5AY`,
    },
  }
  const param = {
      "email": "pawsome.eshop@gmail.com",
      "password": "12345888"
  }

  axios.get('https://online-zoo-store-backend-web-service.onrender.com/api/v1/users/profile', config)
  .then(response => {
    console.log('1 Успешный ответ:', response.data);
  })
  .catch(error => {
    console.error('1 Ошибка запроса:', error);
  });

  axios.get('https://online-zoo-store-backend-web-service.onrender.com/api/v1/users', config)
  .then(response => {
    console.log('2 Успешный ответ:', response.data);
  })
  .catch(error => {
    console.error('2 Ошибка запроса:', error);
  });

  axios.post('https://online-zoo-store-backend-web-service.onrender.com/api/v1/auth/login', param)
  .then(response => {
    console.log('3 Успешный ответ:', response.data);
  })
  .catch(error => {
    console.error('3 Ошибка запроса:', error);
  });
  // const auth = JSON.parse(localStorage.getItem("auth")) || null;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const use = await axiosService.get(`users/profile`, {
  //         headers: {
  //           'Authorization': "Bearer " + auth?.access
  //         },
  //         withCredentials: true,
  //       })
  //       console.log("user", use);
  //       setUser(use)
  //     } catch (error) {
  //       // Обработка ошибки
  //       console.error("Error fetching user profile:", error);
  //     }
  //   };

  //   fetchData();
  // })
  // console.log("2 userr", use);

  return (
    <>
      <h3 className={css.title}>Hello, {userr.firstName}!</h3>

      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.user__name}>
            {userr.firstName} {userr.lastName}
          </p>
          <Link to="/user/info" className={css.icon}>
            <GoPencil size={24} />
          </Link>
        </li>
        <li className={css.item}>
          <p>E-mail</p>
          <p className={css.user__info}>{userr.email}</p>
        </li>
        <li className={css.item}>
          <p>Delivery information</p>
          <p className={css.user__info}>
            <span>{userr.birthDate},</span>
            {/* <span>{user.country}, </span>
            <span>{user.region}, </span>
            <span>{user.city}, </span>
            <span>{user.street}, </span>
            <span>{user.building}, </span>
            {user.flat ? <span>{user.flat}, </span> : null}
            <span>{user.code} </span> */}
          </p>
        </li>
      </ul>

      <UserOrdersNew />
    </>
  );
};

export default UserAccount;