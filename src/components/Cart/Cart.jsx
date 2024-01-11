import { useEffect, useState } from "react";
import css from "./Cart.module.scss";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import CardinCart from "./CardinCart";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../helpers/user.actions";

const Cart = ({ user, toggleModal, setModalState, setProductsQuantity, productsQuantity }) => {
  const [amount, setAmount] = useState(0);
  const { constants } = useConstants();
  const navigate = useNavigate();
  const userActions = useUserActions();

  const localProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const [carts, setCarts] = useState(localProducts || []);

  useEffect(() => {
    const postBack = async () => {
      try {
        const userProducts = await userActions.getCarts() || { items: [] };
        const combinedProducts = combineProducts(userProducts.items, localProducts);
        updateLocalStorageAndState(combinedProducts);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };
  
    const postLocal = async () => {
      try {
        localProducts && setProductsAndAmount(localProducts);
        const userProducts = await userActions.getCarts() || { items: [] };
        console.log("userProducts", userProducts);
        const userProductIds = userProducts.items.map((item) => item.product.id);
    
        const data = localProducts
          .filter((localProduct) => !userProductIds.includes(localProduct.product.id))
          .map((localProduct) => ({
            product: {
              id: localProduct.product.id,
            },
            quantity: localProduct.quantity,
          }));
    
        if (data.length > 0) {
          console.log("!!!data.length!!!", data.length);
          await userActions.postCarts(data);
        }
        console.log("satCarts");
        if (carts.length !== localProducts.length) {
          setCarts(localProducts);
        }
      } catch (error) {
        console.error("Error getting or posting carts:", error);
      }
    };
  
    const combineProducts = (userProducts, localProducts) => {
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
  
    const updateLocalStorageAndState = (products) => {
      localStorage.setItem("cart", JSON.stringify(products));
      setProductsAndAmount(products);
      if (carts.length !== products.length) {
        console.log(carts, products)
        setCarts(products);
      }
    };
  
    const setProductsAndAmount = (products) => {
      console.log("!!!@#$")
      if (productsQuantity !== products.length) {
        console.log("$%^&", productsQuantity, products.length)
        setProductsQuantity(products.length);
      }

      const totalAmount = products.reduce((acc, item) => {
        let price = item.product.priceWithDiscount
          ? item.product.priceWithDiscount
          : item.product.price;
        return acc + price * item.quantity;
      }, 0);
  
      setAmount(totalAmount);
    };

    console.log("!!!", productsQuantity, localProducts.length)
  
    if (user && productsQuantity > localProducts.length) {
      console.log(1);
      postBack();
    } if (user && productsQuantity <= localProducts.length) {
      console.log(2)
      postLocal()
    } if (!user) {
      console.log(3)
      updateLocalStorageAndState(localProducts)
    }
  }, [user, localProducts, setProductsQuantity, setCarts]);

  return (
    <Modal onClose={toggleModal} title={"Cart"} cart={true}>
      <div className={css.cartSection}>
        <div>
          {carts.length > 0 &&
            carts.map((item) => (
              <CardinCart
                key={item.product.id}
                item={item}
                user={user}
                localProducts={carts}
                setCarts={setCarts}
                constants={constants}
                setProductsQuantity={setProductsQuantity}
                navigate={navigate}
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
          <button onClick={() => user ? (navigate("order"), toggleModal()) : setModalState(3) } >
            Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
