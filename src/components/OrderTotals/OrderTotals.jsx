import React from 'react'
import styles from './OrderTotals.module.scss'
import { useSelector } from 'react-redux'
import { countSubtotal } from '../../helpers/countSubtotal'

const OrderTotals = () => {
  const cardsInCart = useSelector(({ cardsInCart }) => cardsInCart)
  const cardsList = useSelector(({ cards }) => cards.cards)

  const subTotal = countSubtotal(cardsInCart, cardsList)

  return (
    <div className={styles.orderTotals}>
      <div className={styles.totalsContainer}>
        <h3 className={styles.totalsTitle}>Order totals</h3>
        <p className={styles.totalsPrices}>
          <span>Subtotal:</span>
          <span>{subTotal} UAH</span>
        </p>
      </div>
    </div>
  )
}

export default OrderTotals
