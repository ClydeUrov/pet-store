import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SliderForHomepage.module.scss";
import SaleItemForSlider from "./SaleItemForSlider";
import BrandItemForSlider from "./BrandItemForSlider";
import FavoriteItemForSlider from "./FavoriteItemForSlider";
import ButtonForSlider from "./ButtonForSlider";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import Card from "../Card/Card";

function SliderForHomepage({ title, items, type, slidesPerView }) {
  const swiper = useRef();

  function handleNextScroll() {
    swiper.current.swiper.slideNext();
  }

  function handlePrevScroll() {
    swiper.current.swiper.slidePrev();
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={(styles.arrow, styles.arrow_back)}>
        <ButtonForSlider size={34} type="prev" onClick={handlePrevScroll} />
      </div>
      <div className={styles.swiper_wrapper}>
        <Swiper
          ref={swiper}
          loop={items.length > slidesPerView * 2}
          speed={750}
          modules={[Navigation]}
          slidesPerView={slidesPerView}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              {type === "saleSlider" && <Card item={item} />}
              {type === "brandSlider" && <BrandItemForSlider item={item} />}
              {type === "favoriteSlider" && <FavoriteItemForSlider />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={(styles.arrow, styles.arrow_forward)}>
        <ButtonForSlider size={34} type="next" onClick={handleNextScroll} />
      </div>
    </div>
  );
}

export default SliderForHomepage;
