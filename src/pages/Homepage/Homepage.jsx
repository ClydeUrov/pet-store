import style from "../../App/App.module.scss";
import css from "./Homepage.module.scss";
import React from "react";
import { useState, useEffect } from "react";
import {
  selectBrands,
  selectMainCategories,
  selectOnSale,
} from "../../redux/cards/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getOnSale } from "../../redux/cards/operations";
import MainSliderForCategories from "../../components/MainSliderForCategories/MainSliderForCategories";
import SliderForHomepage from "../../components/SliderForHomepage/SliderForHomepage";

import useWishList from "../../helpers/wishList.actions";
import {
  emptyWishList,
  smthInWishList,
} from "../../helpers/events/LoginLogout";
import { toast } from "react-toastify";

const Homepage = () => {
  const [slidesPerView, setSlidesPerView] = useState(
    Math.floor(window.innerWidth / 300)
  );
  const cardsOnSale = useSelector(selectOnSale);
  const mainCategories = useSelector(selectMainCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(false);
  const { getWishList, deleteOneItemWishList, postItemInWishList } =
    useWishList();

  // toast("ZALUPA");
  useEffect(() => {
    async function fetchWishList() {
      try {
        const wishList = await getWishList();
        setWishList(wishList.data.products);
      } catch (error) {
        toast.error(
          error?.response?.status === 401
            ? `something went wrong with loading your "wish list", please logout and login again. 🙏`
            : `something wrong with loading your wish list`
        );
      }
    }

    fetchWishList();
  }, []);

  useEffect(() => {
    if (wishList.length === 1) {
      smthInWishList();
    } else if (wishList.length === 0) {
      emptyWishList();
    }
  }, [wishList.length]);

  useEffect(() => {
    const handleWindowResize = () => {
      setSlidesPerView(Math.floor(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (brands.content.length || brands.isLoading) return;

    dispatch(getBrands());
  }, [brands, dispatch]);

  useEffect(() => {
    if (cardsOnSale.content.length || cardsOnSale.isLoading) return;
    dispatch(getOnSale());
  }, [dispatch, cardsOnSale]);

  if (
    cardsOnSale.content.length === 0 ||
    mainCategories.content.length === 0 ||
    brands.content.length === 0 ||
    !wishList
  ) {
    return;
  }

  async function handleChangeFavorites(item) {
    if (!!wishList.find((i) => i.id === item.id)?.id) {
      try {
        await toast.promise(deleteOneItemWishList(item.id), {
          error: "Sorry, something went wrong",
        });
        setWishList((items) => items.filter((i) => i.id !== item.id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await toast.promise(postItemInWishList(item.id), {
          error: "Sorry, something went wrong",
        });
        setWishList((items) => [...items, item]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={css.section}>
      <div className={style.container}>
        <MainSliderForCategories items={mainCategories.content} />
        <div className={css.three_swipers}>
          <SliderForHomepage
            onChangeFavorites={handleChangeFavorites}
            favoriteItems={wishList}
            items={cardsOnSale.content}
            title="Your Pet Will Love These"
            type="saleSlider"
            slidesPerView={slidesPerView}
          />

          <SliderForHomepage
            onChangeFavorites={handleChangeFavorites}
            favoriteItems={wishList}
            items={cardsOnSale.content}
            title="On Sale"
            type="saleSlider"
            slidesPerView={slidesPerView}
          />
          <SliderForHomepage
            items={brands.content}
            title="Brands"
            type="brandSlider"
            slidesPerView={slidesPerView}
          />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
