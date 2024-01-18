import { Link } from "react-router-dom";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import styles from "./FavoriteItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { useUserActions } from "../../helpers/user.actions";
import { toast } from "react-toastify";
function FavoriteItem({
  price,
  imgSrc,
  notAvailable,
  name,
  priceWithDiscount,
  onDelete,
  id,
  onAddToCart,
}) {
  const correctname = name.length > 90 ? name.slice(0, 35) + "..." : name;
  const [isLoading, setIsLoading] = useState(false);
  const { postCarts } = useUserActions();

  const { constants } = useConstants();
  async function handleDelete() {
    setIsLoading(true);
    await onDelete(id);
    setIsLoading(false);
  }

  async function handleAddOneItemToCart(item) {
    try {
      await toast.promise(
        () =>
          postCarts([
            {
              product: {
                id: item.id,
              },
              quantity: 1,
            },
          ]),
        {
          error: "Happend some problem with adding this item to card 😔",
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <i
        disabled={isLoading}
        className={`${isLoading ? styles.notAllowed : styles.allowed} ${
          styles.icon
        }`}
        onClick={handleDelete}
      >
        <AiOutlineDelete size={32} />
      </i>
      <div>
        <Link to={`/catalogue/products/${id}`}>
          <img className={styles.image} src={imgSrc} alt="not loaded" />
        </Link>
        <span className={styles.description}>{correctname}</span>
      </div>

      <span
        className={`${!notAvailable ? styles.avaible : styles.unAvaible} ${
          styles.align_cernte
        }`}
      >
        {!notAvailable ? "In Stock" : "Out of Stock"}
      </span>
      <span className={`${styles.align_cernte} ${styles.price}`}>
        {constants[1].value} {priceWithDiscount || price}
      </span>
      <div className={styles.buttton_cont}>
        <button
          className={
            !notAvailable && !isLoading
              ? styles.avaible_btn
              : styles.unAvaible_btn
          }
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default FavoriteItem;
