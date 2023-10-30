import css from "./UserOrderItem.module.scss";
import { allOrders } from "../UserOrdersAll/UserOrdersAll";
import { user } from "../UserAccount/UserAccount";
import { useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';

const UserOrderItem = () => {
  // const [order, setOrder] = useState({});

  //   const navigate = useNavigate();

  // console.log('order', order);

  let { pathname } = useLocation();
  let orderN = pathname.split('/').pop();
  console.log('orderN', orderN);


  const obj = (orderN) => {
    const order = allOrders.find(item => item.orderId === orderN);
    console.log('order', order);
    return order;
  }

  const order = obj(orderN);
  console.log('order.items', order.items);

  return (
    <>
      <h3 className={css.title}>Order information</h3>
      <div className={css.order_info}>
        <ul className={css.order_list}>
          <li className={css.order_list_item}><p className={css.order_item_title}>Created at</p><p className={css.order_item_text}>{order.date}</p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Order №</p><p className={css.order_item_text}>{order.orderId}</p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Status</p><p className={css.order_item_text}>{order.status}</p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Comment</p>
            <p className={css.order_item_text}>{order.comment}</p></li>
        </ul>

        <ul className={css.order_list}>
          <li className={css.order_list_item}><p className={css.order_item_title}>Delivery  №</p><p className={css.order_item_text}>{order.ttn}</p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Delivery method</p><p className={css.order_item_text}>{order.deliveryMethod}</p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Delivery address</p><p className={css.order_item_text}> <span>{user.country}, </span>
            <span>{user.region}, </span>
            <span>{user.city}, </span>
            <span>{user.street}, </span>
            <span>{user.building}, </span>
            {user.flat ? <span>{user.flat}, </span> : null}
            <span>{user.code} </span></p></li>
          <li className={css.order_list_item}><p className={css.order_item_title}>Phone number</p><p className={css.order_item_text}>+{order.phone}</p></li>
        </ul>
      </div>


      <table className={css.table}>
        <thead>
          <tr className={css.table_row}>
            <th className={css.table_header}>Items</th>
            <th className={css.table_header}></th>
            <th className={css.table_header}>Amount</th>
            <th className={css.table_header}>Price</th>
            <th className={css.table_header}>Total</th>
          </tr>
        </thead>

        <tbody className={css.list}>
          {order.items.map(({ name, amount, price, total, picture }) => (
            <tr className={css.table_row} key={name}>
              {/* <tr className={css.table_row} > */}
              <td className={css.table_data}><div className={css.img_cover}>
                {picture ? (
                  <img src={picture} className={css.img} alt={name} />
                ) : null}
              </div></td>
              <td className={css.table_data}> {name}</td>
              <td className={css.table_data}> {amount}</td>
              <td className={css.table_data}> ${price}</td>
              <td className={css.table_data}> ${total}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <ul className={css.order_all}>
        <li className={css.order_all_item}><p className={css.order_payment_title}>Payment method</p><p className={css.order_payment_text}>{order.paymentMethod}</p></li>
        <li className={css.order_all_item}><p className={css.order_total_title}>Total</p><p className={css.order_total_text}>$70</p></li>
      </ul>

    </>
  );
};

export default UserOrderItem;