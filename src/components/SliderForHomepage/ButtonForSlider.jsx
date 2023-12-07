// import styles from './ButtonForSlider.module.css'

import { useSwiper } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ButtonForSlider({ type, size, onClick }) {
  if (type === "next") {
    return (
      <span onClick={onClick}>
        <IoIosArrowForward size={size} />
      </span>
    );
  } else if (type === "prev") {
    return (
      <span onClick={onClick}>
        <IoIosArrowBack size={size} />
      </span>
    );
  }
}

export default ButtonForSlider;
