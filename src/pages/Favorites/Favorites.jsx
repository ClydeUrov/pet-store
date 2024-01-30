import styles from "./Favorites.module.scss";
import FavoriteItem from "../../components/FavoriteIteems/FavoriteItem";
import EmptyWishList from "../../components/FavoriteIteems/EmptyWishList";

import { useEffect, useState } from "react";
import { emptyWishList } from "../../helpers/events/LoginLogout";
import { getWishListLS, setWishListLS } from "../../helpers/wishListLS";
import { CartAddEventPublish } from "../../helpers/events/CartEvent";
import { getUser } from "../../helpers/user.actions";
import useFetchWishList, {
  clearAllWishList,
  deleteOneItemWishList,
  getWishList,
  postItemInWishList,
  refillWishList,
} from "../../helpers/wishList.actions";
import { toast } from "react-toastify";
const user = getUser();

function Favorites() {
  const [items, setItems] = useState(getWishListLS());
  const [isAvaibleBtn, setIsAvaibleBtn] = useState(() => {
    if (user?.role === "ADMIN") return false;
    return items.every((el) => el.notAvailable);
  });
  const { data } = useFetchWishList(getWishList);

  useEffect(() => {
    if (!data.products) return;
    async function fetchWishList() {
      const LSList = getWishListLS();
      const idFromAPI = data.products.map((el) => el.id);
      const idFromLS = LSList.map((el) => el.id);
      const addToAPI = idFromLS.filter((id) => !idFromAPI.includes(id));
      const deleteFromAPI = idFromAPI.filter((id) => !idFromLS.includes(id));

      if (addToAPI.length && deleteFromAPI.length) {
        try {
          await refillWishList(idFromLS);
          return;
        } catch (error) {
          console.error(error);
        }
      }

      if (addToAPI.length) {
        try {
          await postItemInWishList(addToAPI);
        } catch (error) {
          console.log(error);
        }
      }
      if (deleteFromAPI.length) {
        try {
          if (!LSList.length) {
            await clearAllWishList();
          } else if (deleteFromAPI.length === 1) {
            deleteOneItemWishList(deleteFromAPI[0]);
          } else if (deleteFromAPI.length > 1) {
            await refillWishList(idFromLS);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (user?.role === "CLIENT") {
      fetchWishList();
    }
  }, [data.products]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAvaibleBtn(false);
    } else {
      setIsAvaibleBtn(items.some((el) => !el.notAvailable));
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) {
      emptyWishList();
    }
  }, [items.length]);

  async function handleDeleteItem(id) {
    try {
      const corrWishList = items.filter((el) => el.id !== id);

      if (user?.role === "CLIENT") deleteOneItemWishList(id);

      setWishListLS(corrWishList);
      setItems(corrWishList);
    } catch (error) {
      console.log(error);
    }
  }
  const AddToCart = (item) => {
    if (user?.role !== "CLIENT") return;
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

  function handleAddAllToCart() {
    if (isAvaibleBtn) {
      if (items.some((item) => item.notAvailable)) {
        toast.warning("We add to cart ONLY avaible items");
      }
      let carts = [];
      let ids = [];
      const localProducts = JSON.parse(localStorage.getItem("cart")) || [];

      items
        .filter((item) => !item.notAvailable)
        .forEach((item) => {
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
      <div className={styles.header}>
        <h3>My Wishlist</h3>
        <button
          onClick={handleAddAllToCart}
          className={`${isAvaibleBtn ? styles.btn : styles.not_avaible_btn}`}
          disabled={!isAvaibleBtn}
        >
          Add all to Cart
        </button>
      </div>
      {items.length ? (
        <>
          <div className={`${styles.table_head} ${styles.grid_container}`}>
            <span></span>
            <span className={styles.product_header}>Product</span>
            <span className={styles.align_center}>Status</span>
            <span className={styles.align_center}>Unit price</span>
            <span></span>
          </div>
          <div>
            {items.map((item) => (
              <div key={item.id} className={`${styles.grid_container}`}>
                <FavoriteItem
                  id={item.id}
                  name={item.name}
                  imgSrc={item.mainImage.filePath}
                  notAvailable={
                    user?.role === "CLIENT" ? item.notAvailable : true
                  }
                  price={item.price}
                  priceWithDiscount={item.priceWithDiscount}
                  onDelete={handleDeleteItem}
                  onAddToCart={() => AddToCart(item)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyWishList />
      )}
    </div>
  );
}

export default Favorites;
