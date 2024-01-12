import React, { useEffect, useState } from "react";
import css from "./Cart.module.scss";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useUserActions } from "../../helpers/user.actions";

const CardinCart = ({ item, constants, setProductsQuantity, localProducts, setCarts, navigate, user }) => {
  const [totalCart, setTotalCart] = useState(
    item.product.priceWithDiscount
      ? item.product.priceWithDiscount
      : item.product.price
  );
  const userAction = useUserActions();
  const [quantity, setQuantity] = useState(item.quantity);

  function handleChangeQuantity(action) {
    if (action === "+" && quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      const updatedCart = localProducts.map((cartItem) => {
        if (cartItem.product.id === item.product.id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setProductsQuantity(newQuantity);
    } else if (action === "-" && !(quantity === 1)) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const updatedCart = localProducts.map((cartItem) => {
        if (cartItem.product.id === item.product.id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setProductsQuantity(newQuantity);
    }
  }

  useEffect(() => {
    setTotalCart(
      (item.product.priceWithDiscount
        ? item.product.priceWithDiscount
        : item.product.price) * quantity
    );
  }, [quantity, item.product.price, item.product.priceWithDiscount]);

  const handleDelete = (itemId) => {
    console.log("item", item)
    if (user) {
      userAction
        .deleteCart(itemId)
        .then(() => {
          const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
          const updatedCart = existingCart.filter((item) => item.product.id !== itemId);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCarts(updatedCart);
        })
        .catch(error => {
          console.error("Error deleting item from cart:", error);
        });
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = existingCart.filter((item) => item.product.id !== itemId);
      console.log(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCarts(updatedCart);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.picture}>
        {item.product.mainImage.filePath && (
          <img
            src={item.product.mainImage.filePath} 
            onClick={() => navigate(`/catalogue/products/${item.product.id}`)} 
            alt="" 
          />
        )}
      </div>
      <div className={css.body}>
        <p>{item.product.name}</p>
        <div className={css.cardPriceBox}>
          <p
            className={
              css.cardPrice +
              " " +
              (item.product.priceWithDiscount
                ? css.product_price_with_discount
                : "")
            }
          >
            {constants[1].value}{" "}
            {item.product.priceWithDiscount || item.product.price}
          </p>
          {item.product.priceWithDiscount && (
            <p className={css.cardPriceNot}>
              {constants[1].value} {item.product.price}
            </p>
          )}
        </div>
        <div className={css.product_quantity}>
          <button
            type="button"
            className={css.btn_quantity}
            onClick={() => handleChangeQuantity("-")}
          >
            <AiOutlineMinus size={13} />
          </button>
          <p className={css.quantity}>{quantity}</p>
          <button
            type="button"
            className={css.btn_quantity}
            onClick={() => handleChangeQuantity("+")}
          >
            <AiOutlinePlus size={13} />
          </button>
        </div>
      </div>
      <div className={css.end}>
        <AiOutlineDelete
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(item.product.id)}
        />
        <span style={{ whiteSpace: "nowrap" }}>
          {constants[1].value} {totalCart.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CardinCart;
