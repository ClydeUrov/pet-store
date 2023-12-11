import css from "./Accordion.module.scss";
import { useState } from "react";
import ReactSlider from "react-slider";
import Button from "../CustomButton/Button";

const MIN = 0;
const MAX = 12000;

export const PriceRange = () => {
  const [prices, setPrices] = useState([MIN, MAX]);

  const [formData, setFormData] = useState({
    priceMin: MIN,
    priceMax: MAX,
  });

  const handleChange = (value) => {
    console.log(value);
    setFormData({
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const handleSubmit = () => {
    console.log("formData", formData);
    // Далее можно отправить данные формы или выполнить необходимые действия.
    // Например, вызвать функцию setPrices с новыми значениями цен.
    setPrices([formData.priceMin, formData.priceMax]);
  };

  return (
    <>
      <ReactSlider
        className={css.slider}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        value={prices}
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />

      <div className={css.slider_box}>
        <ul className={css.slider_input_box}>
          <li className={css.slider_item}>
            <input
              id="priceMin"
              readOnly
              type="text"
              value={formData.priceMin}
              className={css.slider_input}
            />
          </li>

          <li className={css.slider_item}>
            <input
              id="priceMax"
              readOnly
              type="text"
              value={formData.priceMax}
              className={css.slider_input}
            />
          </li>
        </ul>
        <Button text={"OK"} onClickHandler={handleSubmit} isDisabled={false} />
      </div>
    </>
  );
};
