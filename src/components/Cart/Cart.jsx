import { useEffect, useState } from "react";
import css from "./Cart.module.scss";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import CardinCart from "./CardinCart";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../helpers/user.actions";

const Cart = ({ user, toggleModal, setModalState, productsQuantity }) => {
  const { constants } = useConstants();
  const navigate = useNavigate();
  const userActions = useUserActions();

  const [totalAmount, setTotalAmount] = useState(0);
  const localProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const [carts, setCarts] = useState(localProducts || []);

  useEffect(() => {
    const combineCart = async () => {
      CalculateTotalAmount();
      const userProducts = await userActions.getCarts().catch((e) => console.log(e)) || { items: [] };
      const dataForLocal = userProducts.items
        .filter(
          (userProduct) =>
            !localProducts.some(
              (localProduct) => userProduct.product.id === localProduct.product.id
            )
        )
        .map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            ...(item.product.priceWithDiscount && {
              priceWithDiscount: item.product.priceWithDiscount,
            }),
            mainImage: { filePath: item.product.mainImage.filePath },
          },
          quantity: item.quantity,
        }));

      if (dataForLocal.length > 0) {
        const combinedProducts = combineProducts(dataForLocal, localProducts);
        localStorage.setItem("cart", JSON.stringify(combinedProducts));
        setCarts(combinedProducts);
        CalculateTotalAmount(combinedProducts)
      }

      const dataForBack = localProducts
        .filter((localProduct) =>
          userProducts.items.every(
            (userProduct) =>
              userProduct.product.id !== localProduct.product.id ||
              userProduct.quantity !== localProduct.quantity
          )
        )
        .map((item) => ({
          product: {
            id: item.product.id,
          },
          quantity: item.quantity,
        }));

      if (dataForBack.length > 0) {
        await userActions.postCarts(dataForBack);
      }
    }
      
    if (user) {
      combineCart()
    } else {
      CalculateTotalAmount(localProducts)
    }
  }, []);

  function combineProducts (userProducts, localProducts) {
    const combinedProducts = [
      ...userProducts.map((item) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          ...(item.product.priceWithDiscount && {
            priceWithDiscount: item.product.priceWithDiscount,
          }),
          mainImage: { filePath: item.product.mainImage.filePath },
        },
        quantity: item.quantity,
      })),
      ...localProducts,
    ];

    return combinedProducts.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.product.id === product.product.id)
    );
  };

  function CalculateTotalAmount(products) {
    const itemsToCalculate = products || localProducts;
    const totalAmount = itemsToCalculate.reduce((acc, item) => {
      let price = item.product.priceWithDiscount
        ? item.product.priceWithDiscount
        : item.product.price;
      return acc + price * item.quantity;
    }, 0);

    setTotalAmount(totalAmount);
  }

  return (
    <Modal onClose={toggleModal} title={"Cart"} cart={true} productsQuantity={productsQuantity.length}>
      <div className={css.cartSection}>
        <div className={css.cartList}>
          {carts.length > 0 &&
            carts.map((item) => (
              <CardinCart
                key={item.product.id}
                item={item}
                user={user}
                localProducts={carts}
                setCarts={setCarts}
                constants={constants}
                navigate={navigate}
                CalculateTotalAmount={CalculateTotalAmount}
              />
            ))}
        </div>
        <div className={css.bottom}>
          <div className={css.total}>
            <p>Total:</p>{" "}
            <p>{constants[1].value} {totalAmount.toFixed(2)}</p>
          </div>
          <button onClick={() => user ? (navigate("order"), toggleModal()) : setModalState(3) } >
            Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
