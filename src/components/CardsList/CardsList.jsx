import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./CardsList.module.scss";
import { selectCards } from "../../redux/cards/selectors";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { getWishListLS, setWishListLS } from "../../helpers/wishListLS";
import {
  emptyWishList,
  smthInWishList,
} from "../../helpers/events/LoginLogout";

const CardsList = ({ setPage }) => {
  const cards = useSelector(selectCards) || {};
  const { content } = cards || {};
  const [wishList, setWishList] = useState(getWishListLS());

  useEffect(() => {
    if (wishList.length === 1) {
      smthInWishList();
    } else if (wishList.length === 0) {
      emptyWishList();
    }
  }, [wishList.length]);

  console.log(cards.number, cards.totalElements, cards.size);

  return (
    <>
      {content ? (
        <div>
          <ul className={styles.list}>
            {content.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  favoriteItems={wishList}
                  onChangeFavorites={setWishList}
                />
              );
            })}
          </ul>
          <Pagination
            className="pagination-bar"
            currentPage={cards.number + 1}
            totalCount={cards.totalElements}
            pageSize={cards.size}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CardsList;
