// Основна функція CartList - це приймати список карток товарів cards та функцію onClickHandler, яка викликається при кліку 
//на картку. Вона мапить кожну картку у корзині на компонент CardInCart та виводить їх всі разом у вигляді списку.
// propTypes та defaultProps використовуються для задання типів властивостей і значень за замовчуванням для цього компонента.


import styles from './CartList.module.scss'
import CardInCart from '../CardInCart/CardInCart'

const CartList = ({ cards, onClickHandler }) => {
  const cardsComponents = cards.map(({ title, price, id, color, imgSrc }) => {
    return (
      <CardInCart
        key={id}
        title={title}
        price={price}
        id={id}
        color={color}
        imgSrc={imgSrc}
        onClickHandler={onClickHandler}
      />
    )
  })

  return <ul className={styles.list}>{cardsComponents}</ul>
}



CartList.defaultProps = {
  cards: [], // За замовчуванням, якщо `cards` не передано, воно буде пустим масивом
}

export default CartList
