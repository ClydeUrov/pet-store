import style from "../../App/App.module.scss";
import css from "./Homepage.module.scss";
import { toast } from "react-toastify";
import React from "react";
import { useState, useEffect } from "react";
import { fetchMainCategories } from "../../helpers/api";
import { SliderOfCards } from "../../components/SliderOfCards/SliderOfCards";
import { SliderOfCategories } from "../../components/SliderOfCategories/SliderOfCategories";
import { SliderOfBrands } from "../../components/SliderOfBrands/SliderOfBrands";
import { selectOnSale } from "../../redux/cards/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getOnSale } from "../../redux/cards/operations";
import { fetchIndicators } from "../../helpers/api";
import MainSliderForCategories from "../../components/MainSliderForCategories/MainSliderForCategories";

const Homepage = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchMainCategories()
      .then(setMainCategories)
      .catch((error) => {
        toast.error(
          `Oops, something went wrong! Reload the page or try again later!`
        );
        console.log("Error", error);
      });
    fetchIndicators("brands")
      .then(setBrands)
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOnSale());
    return;
  }, [dispatch]);

  const cardsOnSale = useSelector(selectOnSale);

  if (cardsOnSale.length === 0 || mainCategories.length === 0) {
    return;
  }

  const { content } = cardsOnSale;

  console.log(mainCategories);

  return (
    <section className={css.section}>
      <div className={style.container}>
        <MainSliderForCategories items={mainCategories} />

        <div className={css.slider_box}>
          <h2 className={css.subtitle}>On Sale</h2>
          <SliderOfCards items={content} />
        </div>

        <h2 className={css.subtitle}>brands</h2>

        <SliderOfBrands items={brands} />
      </div>
    </section>
  );
};

export default Homepage;
