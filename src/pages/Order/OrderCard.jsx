import { useMemo } from "react";
import css from "./Order.module.scss";

const OrderCard = ({item, constants}) => {
  const totalCart = useMemo(() => (
    (item.product.priceWithDiscount
      ? item.product.priceWithDiscount
      : item.product.price) * item.quantity
  ), [item.product.price, item.product.priceWithDiscount, item.quantity]);

  return (
    <div className={css.card}>
      <div className={css.picture}>
        {item.product.mainImage.filePath && (
          <img
            src={item.product.mainImage.filePath}
            alt=""
          />
        )}
      </div>
      <div className={css.body}>
        <p>{item.product.name}</p>
        <div className={css.cardPriceBox}>
          <p className={css.cardPrice + " " + (item.product.priceWithDiscount ? css.product_price_with_discount : "")}>
            {constants[1].value}{' '}
            {item.product.priceWithDiscount || item.product.price}
            <span style={{color:"black"}}> x {item.quantity}</span>
          </p>
          
          
          <span className={css.totalValue}>
            {item.product.priceWithDiscount && (
              <span className={css.cardPriceNot}>
                {constants[1].value} {item.product.price * item.quantity}
              </span>
            )}
            {" "}{constants[1].value} {totalCart.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderCard;