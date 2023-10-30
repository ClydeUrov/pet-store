import React, { useEffect } from "react";
// import { fetchCardsList } from '../../store/cards/actions' // Імпортуємо функцію для отримання списку карток товарів зі складу.
import styles from "./Cart.module.scss";
//import CartList from '../../components/CartList/CartList' // Імпортуємо компонент для відображення списку товарів у кошику.
import { useSelector } from "react-redux"; // Імпортуємо функції для взаємодії зі стором Redux.
// import { removeFromCart } from '../../store/cart/actions' // Імпортуємо функцію для видалення товару з кошика.
import Loader from "../../components/Loader/Loader"; // Імпортуємо компонент завантаження.
//import { CartForm } from '../../components/CartForm/CartForm' // Імпортуємо компонент для відображення форми замовлення.
//import OrderTotals from '../../components/OrderTotals/OrderTotals' // Імпортуємо компонент для підсумкової інформації про замовлення.

const Cart = () => {
  const isLoading = useSelector(({ cards }) => cards.isLoading); // Витягуємо статус завантаження списку карток товарів зі стору Redux.
  //const cardsList = useSelector(({ cards }) => cards.cards) // Витягуємо список карток товарів зі стору Redux.
  const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart); // Витягуємо список товарів у кошику зі стору Redux.
  const hasError = useSelector(({ hasError }) => hasError); // Витягуємо статус помилки зі стору Redux.
  // const dispatch = useDispatch() // Ініціалізуємо функцію dispatch для відправки дій до стору Redux.
  console.log(cardsInCart + 'sssssssssssssssssssssssssssss')
  useEffect(() => {
    console.log("fetchCardsList");
    // dispatch(fetchCardsList()) // Викликаємо функцію для отримання списку карток товарів при завантаженні компонента.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const deleteFromCartHandler = (id) => {
  //   console.log("removeFromCart, id", id);
  //  // dispatch(removeFromCart(id)) // Функція для видалення товару з кошика із використанням Redux.
  // }

  let content;

  if (hasError) {
    content = <div>Sorry, error</div>; // Відображення повідомлення про помилку, якщо така виникла.
  }
  // else {
  //   const filteredCards = cardsList.filter(({ id }) => {
  //     return cardsInCart.find(({ id }) => {
  //       return id
  //     })
  //   })
  //   content = (
  //     <>
  //       <CartList
  //         cards={filteredCards}
  //         onClickHandler={deleteFromCartHandler}
  //       />
  //       {/* Відображення списку товарів у кошику. */}
  //       <div className={styles.totalBlock}>
  //         <OrderTotals />
  //         {/* // Відображення підсумкової інформації про замовлення. */}
  //       </div>
  //       <CartForm />
  //       {/* // Відображення форми замовлення. */}
  //     </>
  //   )
  // }
  if (cardsInCart === undefined) {
    return <h1> bucket is empty </h1>
  }
  return (
    <div className={styles.cartSection}>
      <div className={styles.container}>
        <h2 className={styles.cartTitle}>1. Products - {cardsInCart.length}</h2>{" "}
        {/* // Відображення заголовка та кількості товарів у кошику. */}
        {isLoading ? <Loader /> : ""}
        {/* // Відображення компонента завантаження        під час завантаження даних. */}
        {cardsInCart.length >= 1 ? (
          <div className={styles.cartInner}>
            <ul className={styles.listTitles}>
              <li>Photo</li>
              <li>Description</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Total</li>
            </ul>
            {content}
          </div>
        ) : (
          (content = <p className={styles.noItemsTitle}>No items in cart</p>)
        )}{" "}
        {/* // Відображення списку товарів у кошику або повідомлення про відсутність        товарів. */}
      </div>
    </div>
  );
};

export default Cart;
