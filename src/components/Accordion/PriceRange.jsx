import css from "./Accordion.module.scss";
import { useState } from "react";
import ReactSlider from "react-slider";
import Button from "../CustomButton/Button";

const MIN = 0;
const MAX = 12000;

export const PriceRange = () => {
  const [prices, setPrices] = useState([MIN, MAX]);

  const handleSubmit = () => {
    console.log("prices", prices);
  };

  return (
    <>
      <ReactSlider
        className={css.slider}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        value={prices}
        min={MIN}
        max={MAX}
        onChange={setPrices}
      />

      <div className={css.slider_box}>
        <ul className={css.slider_input_box}>
          <li className={css.slider_item}>
            <input
              id="priceMin"
              readOnly
              type="text"
              value={prices[0]}
              className={css.slider_input}
            />
          </li>

          <li className={css.slider_item}>
            <input
              id="priceMax"
              readOnly
              type="text"
              value={prices[1]}
              className={css.slider_input}
            />
          </li>
        </ul>
        <Button text={'OK'} onClickHandler={handleSubmit} isDisabled={false} />      </div>
    </>
  );
};
