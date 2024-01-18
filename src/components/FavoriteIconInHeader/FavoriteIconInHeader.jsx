import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./FavoriteIconInHeader.module.scss";
import {
  emptyWishListSubscribe,
  emptyWishListUnsubscribe,
  smthInWishListSubscribe,
  smthInWishListUnsubscribe,
} from "../../helpers/events/LoginLogout";
import { getWishListLS } from "../../helpers/wishListLS";

function FavoriteIconInHeader() {
  const [favorites, setFavorites] = useState(
    getWishListLS().length ? true : false
  );

  useEffect(() => {
    function handleEmpty() {
      setFavorites(false);
    }
    function handleSTMTH() {
      setFavorites(true);
    }
    emptyWishListSubscribe(handleEmpty);
    smthInWishListSubscribe(handleSTMTH);

    return () => {
      emptyWishListUnsubscribe(handleEmpty);
      smthInWishListUnsubscribe(handleSTMTH);
    };
  }, []);

  return (
    <NavLink
      to="/favorites"
      className={`${favorites ? styles.red_heart : styles.option}`}
    >
      {favorites ? <FaHeart size={32} /> : <FaRegHeart size={32} />}
    </NavLink>
  );
}

export default FavoriteIconInHeader;
