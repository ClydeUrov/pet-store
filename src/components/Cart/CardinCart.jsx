import React, { useEffect, useMemo, useState } from "react";
import css from "./Cart.module.scss";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useUserActions } from "../../helpers/user.actions";
import { CartAddEventPublish } from "../../helpers/events/CartEvent";

const CardinCart = ({ item, constants, setCarts, navigate, user, CalculateTotalAmount }) => {
  const userAction = useUserActions();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState([]);
  const [quantity, setQuantity] = useState(item.quantity);

  const totalCart = useMemo(() => (
    (item.product.priceWithDiscount
      ? item.product.priceWithDiscount
      : item.product.price) * quantity
  ), [quantity, item.product.price, item.product.priceWithDiscount]);

  useEffect(() => {
    const handleDeleteQueue = async () => {
      const localProducts = JSON.parse(localStorage.getItem("cart")) || []
      if (user && deleteQueue.length > 0 && !isDeleting) {
        setIsDeleting(true);

        try {
          while (deleteQueue.length > 0) {
            const currentItemId = deleteQueue.shift();
            await CartAddEventPublish({ id: [currentItemId], action: '-' });
            const updatedCart = localProducts.filter((item) => item.product.id !== currentItemId);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            await setCarts((prevCarts) => prevCarts.filter(item => item.product.id !== currentItemId));
            await userAction.deleteCart(currentItemId);
            
            console.log(`Item ${currentItemId} deleted successfully`);

            
            // setCarts(updatedCart);
          }
        } catch (error) {
          console.error("Error deleting items from cart:", error);
        } finally {
          setIsDeleting(false);
        }
      }
    };

    handleDeleteQueue();
  }, [deleteQueue]);

  const handleChangeQuantity = (action) => {
    const localProducts = JSON.parse(localStorage.getItem("cart")) || []
    if (action === "+" && quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      const updatedCart = localProducts.map((cartItem) => (
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ));
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      CalculateTotalAmount(updatedCart);
    } else if (action === "-" && !(quantity === 1)) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const updatedCart = localProducts.map((cartItem) => (
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ));
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      CalculateTotalAmount(updatedCart);
    }
  }

  const handleDelete = (itemId) => {
    if (user) {
      setDeleteQueue((prevQueue) => [...prevQueue, itemId]);
    } else {
      const localProducts = JSON.parse(localStorage.getItem("cart")) || []
      const updatedCart = localProducts.filter((cartItem) => cartItem.product.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      CartAddEventPublish({ action: '-', id: [itemId] });
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
            {constants[1].value}{' '}
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