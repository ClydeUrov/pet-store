import style from "../../App/App.module.scss";
import css from "./Homepage.module.scss";
import { toast } from "react-toastify";
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import { fetchMainCategories } from "../../helpers/api";
import { selectOnSale } from "../../redux/cards/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getOnSale } from "../../redux/cards/operations";
import { fetchIndicators } from "../../helpers/api";
import MainSliderForCategories from "../../components/MainSliderForCategories/MainSliderForCategories";
import SliderForHomepage from "../../components/SliderForHomepage/SliderForHomepage";

const Homepage = ({ allCategAndBrands }) => {
  const [mainCategories, setMainCategories] = useState(allCategAndBrands.main);
  const [brands, setBrands] = useState(allCategAndBrands.brands);
  const [slidesPerView, setSlidesPerView] = useState(
    Math.floor(window.innerWidth / 300)
  );
  const { current: checkStorageOnSale } = useRef(useSelector(selectOnSale));

  useEffect(() => {
    const handleWindowResize = () => {
      setSlidesPerView(Math.floor(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const fetchAllCategor = useCallback(() => {
    fetchMainCategories()
      .then((res) => {
        allCategAndBrands.main = res;
        setMainCategories(res);
      })
      .catch((error) => {
        toast.error(
          `Oops, something went wrong! Reload the page or try again later!`
        );
        console.log("Error", error);
      });
    fetchIndicators("brands")
      .then((res) => {
        allCategAndBrands.brands = res;
        setBrands(res);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [allCategAndBrands]);

  useEffect(() => {
    if (allCategAndBrands.brands.length && allCategAndBrands.main.length)
      return;
    fetchAllCategor();
  }, [allCategAndBrands, fetchAllCategor]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (checkStorageOnSale?.content?.length) return;
    dispatch(getOnSale());
    return;
  }, [dispatch, checkStorageOnSale]);

  const cardsOnSale = useSelector(selectOnSale);

  if (cardsOnSale.length === 0 || mainCategories.length === 0) {
    return;
  }
  const { content } = cardsOnSale;

  return (
    <section className={css.section}>
      <div className={style.container}>
        <MainSliderForCategories items={mainCategories} />
        <div className={css.three_swipers}>
          <SliderForHomepage
            items={content}
            title="Your Pet Will Love These"
            type="saleSlider"
            slidesPerView={slidesPerView}
          />

          <SliderForHomepage
            items={content}
            title="On Sale"
            type="saleSlider"
            slidesPerView={slidesPerView}
          />
          <SliderForHomepage
            items={brands}
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
