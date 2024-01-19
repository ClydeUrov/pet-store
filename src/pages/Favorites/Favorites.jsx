import { useEffect, useState } from "react";
import FavoriteItem from "../../components/FavoriteIteems/FavoriteItem";

import styles from "./Favorites.module.scss";
import EmptyWishList from "../../components/FavoriteIteems/EmptyWishList";
import Loader from "../../components/Loader/Loader";
import { emptyWishList } from "../../helpers/events/LoginLogout";
import { getWishListLS, setWishListLS } from "../../helpers/wishListLS";
import { CartAddEventPublish } from "../../helpers/events/CartEvent";

function Favorites() {
  const [items, setItems] = useState(getWishListLS());
  const [isLoading, setIsLoading] = useState(false);
  const [isAvaibleBtn, setIsAvaibleBtn] = useState(() => {
    return items.every((el) => el.notAvailable);
  });

  useEffect(
    () => setIsAvaibleBtn(!items.some((el) => el.notAvailable)),
    [items]
  );

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      emptyWishList();
    }
  }, [items.length, isLoading]);

  if (isLoading) return <Loader />;

  async function handleDeleteItem(id) {
    try {
      const corrWishList = items.filter((el) => el.id !== id);

      setWishListLS(corrWishList);
      setItems(corrWishList);
    } catch (error) {
      console.log(error);
    }
  }
  const AddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const isItemInCart = existingCart.some(
      (cartItem) => cartItem.product.id === item.id
    );

    if (!isItemInCart) {
      const data = {
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          ...(item.priceWithDiscount && {
            priceWithDiscount: item.priceWithDiscount,
          }),
          mainImage: { filePath: item.mainImage.filePath },
        },
        quantity: 1,
      };

      const newCart = [...existingCart, data];

      localStorage.setItem("cart", JSON.stringify(newCart));

      CartAddEventPublish({ action: "+", id: [item.id] });
    }
  };
  async function handleAddOneItemToCart(item) {
    AddToCart(item);
  }
  function handleAddAllToCart() {
    if (isAvaibleBtn) {
      let carts = [];
      let ids = [];
      const localProducts = JSON.parse(localStorage.getItem("cart")) || [];

      items.forEach((item) => {
        console.log(item);
        const productData = {
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            ...(item.priceWithDiscount && {
              priceWithDiscount: item.priceWithDiscount,
            }),
            mainImage: { filePath: item.mainImage.filePath },
          },
          quantity: 1,
        };
        carts.push(productData);
        ids.push(item.id);
      });

      const additionalProducts = localProducts.filter(
        (item) => !ids.includes(item.product.id)
      );
      carts = carts.concat(additionalProducts);

      localStorage.setItem("cart", JSON.stringify(carts));
      CartAddEventPublish({ action: "+", id: ids });
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3>My Wishlist</h3>
      {items.length ? (
        <>
          <div className={`${styles.table_head} ${styles.grid_container}`}>
            <span></span>
            <span className={styles.product_header}>Product</span>
            <span className={styles.align_center}>Status</span>
            <span className={styles.align_center}>Unit price</span>
            <span></span>
          </div>
          <div className={styles.items_wrapper}>
            {items.map((item) => (
              <div key={item.id} className={`${styles.grid_container}`}>
                <FavoriteItem
                  disabled={isLoading}
                  id={item.id}
                  name={item.name}
                  imgSrc={item.mainImage.filePath}
                  notAvailable={item.notAvailable}
                  price={item.price}
                  priceWithDiscount={item.priceWithDiscount}
                  onDelete={handleDeleteItem}
                  onAddToCart={() => handleAddOneItemToCart(item)}
                />
              </div>
            ))}
          </div>
          <div className={styles.btn_wrapper}>
            <button
              onClick={handleAddAllToCart}
              className={`${
                isAvaibleBtn ? styles.btn : styles.not_avaible_btn
              }`}
              disabled={!isAvaibleBtn}
            >
              Add all to Cart
            </button>
          </div>
        </>
      ) : (
        <EmptyWishList />
      )}
    </div>
  );
}

export default Favorites;
