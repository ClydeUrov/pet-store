import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import css from "./SliderOfCategories.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { makeMainLinkName } from "../../helpers/functions";

export const SliderOfCategories = ({ items }) => {
  const swiperRef = React.useRef(null);

  return (
    <>
      <div className={css.inner}>
        <Swiper
          ref={swiperRef}
          slidesPerView={2}
          speed={1000}
          loop={true}
          spaceBetween={442}
          navigation={{
            prevEl: "css.swiper_btn_prev",
            nextEl: "css.swiper_btn_next",
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          className={css.swiper}
        >
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id} className={css.swiper_slide}>
                <Link to={makeMainLinkName(item)} className={css.link}>
                  <div className={css.img_cover}>
                    {!item.image ? (
                      <h3 className={css.slide_title}>{item.name}</h3>
                    ) : (
                      <img
                        // className={css.itemImg}
                        src={item.image.filePath}
                        alt={item.name}
                      />
                    )}

                    <h3 className={css.slide_title}>{item.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          type="button"
          className={css.swiper_btn_prev}
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <IoIosArrowForward size={24} />
        </button>
        <button
          type="button"
          className={css.swiper_btn_next}
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <IoIosArrowBack size={24} />
        </button>
      </div>
    </>
  );
};
