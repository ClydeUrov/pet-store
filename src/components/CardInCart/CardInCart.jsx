import React from 'react'
import styles from './CardInCart.module.scss' 
import TrashIcon from './TrashIcon' 


const NOIMGSRC = 'img/notfound.png' // Шлях до зображення, яке використовується, якщо imgSrc порожній

const CardInCart = ({
  id, // Артикул товару (число)
  imgSrc, // URL зображення товару
  title, // Назва товару
  color, // Колір товару
  price, // Ціна товару (число)
  isPriceShow, // Показувати ціну (булеве значення)
  onClickHandler, // Обробник кліку на картку товару
  hasQuantityBtns, // Показувати кнопки для зміни кількості товару (булеве значення)
  hasTrashIcon, // Показувати іконку смітника (булеве значення)
}) => {
 // const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart) // Отримуємо дані з Redux за допомогою useSelector
 // const currentCard = cardsInCart.find(({ id }) => id === id) // Знаходимо поточну картку товару у кошику за артикулом
 // const dispatch = useDispatch() // Отримуємо функцію dispatch з Redux для відправлення дій

  const decrementHandler = () => {
    console.log('decrementHandler');
  }

  const incrementHandler = () => {
    console.log('incrementHandler');
  }

  return (
    <li className={styles.item}>
      <img
        src={imgSrc ? imgSrc : NOIMGSRC}
        alt={title}
        className={styles.img}
      />
      <div className={styles.itemInfo}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={styles.color}>Color: {color}</p>
        <p className={styles.id}>id: {id}</p>
      </div>
      {isPriceShow ? <p className={styles.price}>{price} UAH</p> : ''}
      <p className={styles.quantity}>
        {hasQuantityBtns ? (
          <button
            className={`${styles.quantityBtn} ${styles.decrement}`}
            onClick={decrementHandler}
          >
            -
          </button>
        ) : (
          ''
        )}
        <span>currentCard</span>
        {/* <span>{currentCard.count}</span> */}
        {hasQuantityBtns ? (
          <button
            className={`${styles.quantityBtn} ${styles.increment}`}
            onClick={incrementHandler}
          >
            +
          </button>
        ) : (
          ''
        )}
      </p>
      {/* <p className={styles.total}>{currentCard.count * price} UAH</p> */}
      <p className={styles.total}>currentCard UAH</p>
      {hasTrashIcon ? (
        <button
          className={styles.deleteItemBtn}
          onClick={() => {
            onClickHandler(id)
          }}
        >
          <TrashIcon />
        </button>
      ) : (
        ''
      )}
    </li>
  )
}

// CardInCart.propTypes = {
//     id: PropTypes.number.isRequired, // Артикул обов'язковий та має бути числом
//     imgSrc: PropTypes.string, // URL зображення, необов'язковий
//     title: PropTypes.string.isRequired, // Назва обов'язкова та має бути рядком
//     color: PropTypes.string.isRequired, // Колір обов'язковий та має бути рядком
//     price: PropTypes.number.isRequired, // Ціна обов'язкова та має бути числом
//     onClickHandler: PropTypes.func, // Функція-обробник кліку, необов'язкова
//     isPriceShow: PropTypes.bool, // Показувати ціну, необов'язкове булеве значення
//     hasQuantityBtns: PropTypes.bool, // Показувати кнопки зміни кількості товару, необов'язкове булеве значення
//     hasTrashIcon: PropTypes.bool, // Показувати іконку смітника, необов'язкове булеве значення
//     orderModalStyles: PropTypes.bool, // Використовувати стилі для модального вікна замовлення, необов'язкове булеве значення
// }

// CardInCart.defaultProps = {
//     imgSrc: "", // За замовчуванням, imgSrc порожній рядок
//     isPriceShow: true, // За замовчуванням, показувати ціну
//     hasQuantityBtns: true, // За замовчуванням, показувати кнопки зміни кількості товару
//     hasTrashIcon: true, // За замовчуванням, показувати іконку смітника
//     orderModalStyles: false, // За замовчуванням, не використовувати стилі для модального вікна замовлення
// }

export default CardInCart // Експортуємо компонент CardInCart
