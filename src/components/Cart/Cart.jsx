import { useEffect, useState } from "react";
import css from "./Cart.module.scss";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import CardinCart from "./CardinCart";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const Cart = ({ user, toggleModal, setModalState }) => {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);
  const { constants } = useConstants();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("cart")));
  }, [setProducts]);

  useEffect(() => {
    const totalAmount = products.reduce((acc, product) => {
      let price = product.discount ? product.discount : product.price
      return acc + price * product.quantity;
    }, 0);
    
    setAmount(totalAmount);
  }, [products]);

  return (
    <Modal onClose={toggleModal} title={"Cart"} cart={true}>
      <div className={css.cartSection}>
        <div>
          {products.length > 0 &&
            products?.map((product) => (
              <CardinCart
                key={product.id}
                product={product}
                setProducts={setProducts}
                constants={constants}
              />
            ))}
        </div>
        <div className={css.bottom}>
          <div className={css.total}>
            <p>Total:</p>{" "}
            <p>
              {constants[1].value} {amount.toFixed(2)}
            </p>
          </div>
          <button onClick={() => user ? navigate('order') : setModalState(3)}>Checkout</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
