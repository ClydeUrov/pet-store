import css from "./UserOrdersAll.module.scss";
// import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
import UserOrdersList from '../UserOrdersList/UserOrdersList';


export const allOrders = [
  {
    orderId: "728958181",
    status: "New",
    date: "28.08.2023",
    summ: "2.00",
    deliveryMethod: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'Credit card',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {

        name: "qqqqq fgbfgbgvn bgfhbfhbfgth  trhrhbfhtf",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "kkkkkk",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
    ],
  },
  {
    orderId: "728958232",
    status: "Delivering",
    date: "29.08.2023",
    summ: "3.00",
    method: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'Credit card',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {
        name: "wwwwq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
    ],
  },
  {
    orderId: "728958785",
    status: "New",
    date: "30.08.2023",
    summ: "4.00",
    method: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'Credit card',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {
        name: "ggggg",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
    ],
  },
  {
    orderId: "728958111",
    status: "Delivering",
    date: "27.08.2023",
    summ: "5.00",
    method: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'Cash',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {
        name: "tttttt",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "nnnnnn",
        amount: '2',
        price: '3',
        total: '6',
        picture: "",
      },
    ],
  },
  {
    orderId: "728958233",
    status: "Delivering",
    date: "29.08.2023",
    summ: "3.00",
    method: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'Debit',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {
        name: "wwwwq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "wwwwqffff",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllqqffffq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllllqqqfffff",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
    ],
  },
  {
    orderId: "728958234",
    status: "Delivering",
    date: "29.08.2023",
    summ: "3.00",
    method: 'Courier delivery',
    phone: '380969278868',
    ttn: '20700488422496',
    paymentMethod: 'card',
    comment: "I need to receive my order by January 1st. I need to receive my order by January 1st. I need to receive my order by January 1st.",

    items: [
      {
        name: "wwwwq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllllqqq",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "wwwwqssss",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
      {
        name: "qqllllqqqssssssssssssss",
        amount: '2',
        price: '3',
        total: '6',
        picture:
          "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
      },
    ],
  },
];

const UserOrdersAll = () => {
  // const [userOrders, setUserOrders] = useState({});

  //   const navigate = useNavigate();

  // console.log('userOrders', userOrders);


  return (
    <>
      <h3 className={css.title}>My orders</h3>

      <UserOrdersList element={allOrders} />
    </>
  );
};

export default UserOrdersAll;