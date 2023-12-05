import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import css from "./MainSliderForCategoories.module.scss";
import { Link } from "react-router-dom";
import { makeMainLinkName } from "../../helpers/functions";
import { useRef } from "react";

function MainSliderForCategories({ items }) {
  const slider1 = useRef();
  const slider2 = useRef();

  console.log(slider1, slider2);

  function handleNextSlide() {
    if (!slider1 && !slider2) return;
    slider1.current.swiper.slidePrev();
    slider2.current.swiper.slidePrev();
  }
  function handlePrevSlide() {
    if (!slider1 && !slider2) return;
    slider1.current.swiper.slideNext();
    slider2.current.swiper.slideNext();
  }

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Swiper
          ref={slider1}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className={css.swip}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={makeMainLinkName(item)}>
                {item.image ? (
                  <figure className={css.figureForImg}>
                    <img
                      src={item.image.filePath}
                      alt={item.name}
                      className={css.img}
                    />
                    <figcaption className={css.figcaptionRight}>
                      {item.name}
                    </figcaption>
                  </figure>
                ) : (
                  <h2>SomePets</h2>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={css.title_box}>
        <p className={css.subheading}>HIGH QUALITY</p>
        <h1 className={css.heading}>FOR PET</h1>
        <p className={css.caption}>
          We have everything your pets could dream of
        </p>
      </div>
      <div className={css.wrapper}>
        <Swiper
          ref={slider2}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className={css.swip}
        >
          {[...items.slice(1), items[0]].map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={makeMainLinkName(item)}>
                {item.image ? (
                  <figure className={css.figureForImg}>
                    <img
                      src={item.image.filePath}
                      alt={item.name}
                      className={css.img}
                    />
                    <figcaption className={css.figcaptionLeft}>
                      {item.name}
                    </figcaption>
                  </figure>
                ) : (
                  <h2>Data not loaded</h2>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className={css.arrowBack} onClick={handlePrevSlide}>
        <IoIosArrowBack size={34} />
      </section>
      <section className={css.arrowForward} onClick={handleNextSlide}>
        <IoIosArrowForward size={34} />
      </section>
    </div>
  );
}

export default MainSliderForCategories;
