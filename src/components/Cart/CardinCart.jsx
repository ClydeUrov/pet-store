import React, { useEffect, useState } from "react";
import css from "./Cart.module.scss";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CardinCart = ({ product, constants, setProducts }) => {
  const [totalCart, setTotalCart] = useState(
    product.discount ? product.discount : product.price
  );
  const [quantity, setQuantity] = useState(1);

  function handleChangeQuantity(action) {
    if (action === "+" && quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateProductQuantity(newQuantity);
    } else if (action === "-" && !(quantity === 1)) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateProductQuantity(newQuantity);
    }
  }

  function updateProductQuantity(newQuantity) {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = existingCart.map((existingProduct) => {
      if (existingProduct.id === product.id) {
        return { ...existingProduct, quantity: newQuantity };
      }
      return existingProduct;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  }

  useEffect(() => {
    setTotalCart(
      (product.discount ? product.discount : product.price) * quantity
    );
  }, [quantity, product.price, product.discount]);

  const handleDelete = (itemId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const indexToRemove = existingCart.findIndex((item) => item.id === itemId);

    if (indexToRemove !== -1) {
      const updatedCart = [
        ...existingCart.slice(0, indexToRemove),
        ...existingCart.slice(indexToRemove + 1),
      ];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setProducts(updatedCart);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.picture}>
        {product.image && <img src={product.image} alt="" />}
      </div>
      <div className={css.body}>
        <p>{product.name}</p>
        <div className={css.cardPriceBox}>
          <p className={css.cardPrice + " " + (product.discount ? css.product_price_with_discount : "")}>
            {constants[1].value} {product.discount || product.price}
          </p>
          {product.discount && (
            <p className={css.cardPriceNot}>
              {constants[1].value} {product.price}
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
          onClick={() => handleDelete(product.id)}
        />
        <span style={{ whiteSpace: "nowrap" }}>
          {constants[1].value} {totalCart.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CardinCart;
