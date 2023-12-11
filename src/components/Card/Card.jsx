import React from "react";
import styles from "./Card.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/cards/selectors";
import { StarRating } from "../StarRatings/StarRatings";
import { Link } from "react-router-dom";
import Button from "../CustomButton/Button";

const Card = ({ item }) => {
  const favorites = useSelector(selectFavorites);

  const handleAddOrDeleteFavorite = () => {
    if (!favorites.find((favorite) => favorite.id === item.id)) {
      console.log("This item has been successfully added to favorites!");

      return;
    }
    console.log("This item was successfully removed from favorites!");
    return;
  };

  return (
    <li className={styles.item}>
      <Link to={`/catalogue/products/${item.id}/about`}>
        <div className={styles.img_cover}>
          {item.mainImage ? (
            <img
              className={styles.itemImg}
              src={item.mainImage.filePath}
              alt={item.name}
            />
          ) : null}
        </div>
      </Link>

      <div className={styles.cardInfo}>
        <div className={styles.cardDescription}>
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>{item.name}</h3>
          </div>
          <div>
            {item.notAvailable ? (
              <p className={styles.cardStockNot}>Out of stock</p>
            ) : (
              <p className={styles.cardStockIn}>In stock</p>
            )}
          </div>

          <div>
            {/* {item.rating ? ( */}
            <div className={styles.cardRating}>
              <div>
                <StarRating n={item.rating} size={16} />
              </div>
              <p className={styles.cardRating_left}>365 reviews</p>
            </div>
            {/* // ) : null} */}
          </div>
          {item.priceWithDiscount ? (
            <div className={styles.cardPriceBox}>
              <p className={styles.cardPrice}>$ {item.priceWithDiscount}</p>
              <p className={styles.cardPriceNot}>$ {item.price}</p>
            </div>
          ) : (
            <div className={styles.cardPriceBox}>
              <p className={styles.cardPrice}>$ {item.price}</p>
            </div>
          )}
        </div>
        <div className={styles.cardButtons}>
          <Button text={"Add to cart"} isDisabled={item.notAvailable} />

          <button
            type="button"
            onClick={handleAddOrDeleteFavorite}
            className={styles.favoriteBox}
          >
            {!favorites.find((favorite) => favorite.id === item.id) ? (
              <AiOutlineHeart size={44} />
            ) : (
              <AiFillHeart size={44} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;
