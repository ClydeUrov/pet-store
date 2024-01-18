import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { StarRating } from "../StarRatings/StarRatings";
import { Link } from "react-router-dom";
import Button from "../CustomButton/Button";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import { CartAddEventPublish } from "../../helpers/events/CartEvent";

const Card = ({ item, favoriteItems, onChangeFavorites }) => {
  const { constants } = useConstants();
  const [isLoadingWishList, setIsLoadingWishList] = useState(false);

  const isFavorite = favoriteItems.find((i) => i.id === item.id) ? true : false;

  const handleAddOrDeleteFavorite = async () => {
    try {
      setIsLoadingWishList(true);
      await onChangeFavorites(item);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingWishList(false);
    }
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const isItemInCart = existingCart.some((cartItem) => cartItem.product.id === item.id);
  
    if (!isItemInCart) {
      const data = {
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          ...(item.priceWithDiscount && { priceWithDiscount: item.priceWithDiscount }),
          mainImage: { filePath: item.mainImage.filePath },
        },
        quantity: 1,
      };
  
      const newCart = [...existingCart, data];
  
      localStorage.setItem('cart', JSON.stringify(newCart));

      CartAddEventPublish({ action: '+', id: [item.id] });
    }
  }

  return (
    <li className={styles.item}>
      <Link to={`/catalogue/products/${item.id}`}>
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
              <p
                className={
                  styles.cardPrice + " " + styles.product_price_with_discount
                }
              >
                {constants[1].value} {item.priceWithDiscount}
              </p>{" "}
              <p className={styles.cardPriceNot}>
                {constants[1].value} {item.price}
              </p>
            </div>
          ) : (
            <div className={styles.cardPriceBox}>
              <p className={styles.cardPrice}>
                {constants[1].value} {item.price}
              </p>
            </div>
          )}
        </div>
        <div className={styles.cardButtons}>
          <Button 
            text={"Add to cart"} 
            onClickHandler={() => handleAddToCart()} 
            isDisabled={item.notAvailable} 
          />

          <button
            type="button"
            onClick={handleAddOrDeleteFavorite}
            className={`${styles.favoriteBox} ${isFavorite && styles.full} ${
              isLoadingWishList ? styles.isLoading : styles.notLoading
            }`}
          >
            {!isFavorite ? (
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
