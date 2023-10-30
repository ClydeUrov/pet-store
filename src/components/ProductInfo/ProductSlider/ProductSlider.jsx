import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/swiper-bundle.css";
import css from "./ProductSlider.module.scss";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const ProductSlider = ({ items }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = React.useRef(null);

  const { images } = items;

  return (
    <div className={css.slider_box}>
      <Swiper
        direction="vertical"
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={16}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.swiper_thumb}
      >
        {images.map((item) => {
          return (
            <SwiperSlide className={css.swiper_slide}>
              <div className={css.swiper_thumb_img_cover}>
                {!item ? null : (
                  <img
                    // className={css.item_img}
                    src={item.filePath}
                    alt={item.name}
                  />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={css.inner_swiper_product}>
        <Swiper
          ref={swiperRef}
          loop={true}
          navigation={{
            prevEl: "css.swiper_prev",
            nextEl: "css.swiper_next",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={css.swiper_product}
        >
          {images.map((item) => {
            return (
              <SwiperSlide className={css.swiper_slide}>
                <div className={css.swiper_product_img_cover}>
                  {!item ? null : (
                    <img
                      // className={css.item_img}
                      src={item.filePath}
                      alt={item.name}
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          type="button"
          className={css.swiper_prev}
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          type="button"
          className={css.swiper_next}
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};
