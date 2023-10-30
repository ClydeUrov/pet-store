import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import css from "./SliderOfCards.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Card from "../Card/Card";

export const SliderOfCards = ({ items }) => {
  const swiperRef = React.useRef(null);

  return (
    <>
      <div className={css.inner}>
        <Swiper
          ref={swiperRef}
          slidesPerView={4}
          loop={true}
          spaceBetween={32}
          navigation={{
            prevEl: "css.swiper_btn_prev",
            nextEl: "css.swiper_btn_next",
          }}
          modules={[Navigation]}
          className={css.swiper}
        >
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id} className={css.swiper_slide}>
                <Card item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          type="button"
          className={css.swiper_btn_prev}
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          type="button"
          className={css.swiper_btn_next}
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </>
  );
};
