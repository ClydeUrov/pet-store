import { useEffect, useState } from "react";
import FavoriteItem from "../../components/FavoriteIteems/FavoriteItem";

import styles from "./Favorites.module.scss";
import EmptyWishList from "../../components/FavoriteIteems/EmptyWishList";
import useWishList from "../../helpers/wishList.actions";
import Loader from "../../components/Loader/Loader";
import { emptyWishList } from "../../helpers/events/LoginLogout";
import { toast } from "react-toastify";

function Favorites() {
  const { getWishList, deleteOneItemWishList } = useWishList();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWishList() {
      try {
        setIsLoading(true);
        const wishList = await getWishList();
        setItems(wishList.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishList();
  }, []);
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      emptyWishList();
    }
  }, [items, items.length, isLoading]);

  async function handleDeleteItem(id) {
    try {
      await toast.promise(deleteOneItemWishList(id), {
        error: "Sorry, something went wrong",
      });
      setItems((items) => items.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  if (isLoading) return <Loader />;

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
                />
              </div>
            ))}
          </div>
          <div className={styles.btn_wrapper}>
            <button className={styles.btn}>Add all to Cart</button>
          </div>
        </>
      ) : (
        <EmptyWishList />
      )}
    </div>
  );
}

export default Favorites;
