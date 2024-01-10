import css from "./Accordion.module.scss";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import Button from "../CustomButton/Button";

export const PriceRange = ({ maxPrice, setPrice }) => {
  const [formData, setFormData] = useState({
    priceMin: 0,
    priceMax: maxPrice,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      priceMax: maxPrice,
    }));
  }, [maxPrice]);

  const handleChange = (value) => {
    setFormData({
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const handleInputChange = (e, field) => {
    const newValue = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(newValue) ? 0 : newValue,
    }));
  };

  const handleSubmit = () => {
    setPrice([formData.priceMin, formData.priceMax]);
  };

  return (
    <>
      <ReactSlider
        className={css.slider}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        value={[formData.priceMin, formData.priceMax]}
        min={0}
        max={maxPrice}
        onChange={handleChange}
      />

      <div className={css.slider_box}>
        <ul className={css.slider_input_box}>
          <li className={css.slider_item}>
            <input
              id="priceMin"
              type="text"
              value={formData.priceMin}
              onChange={(e) => handleInputChange(e, 'priceMin')}
              className={css.slider_input}
            />
          </li>

          <li className={css.slider_item}>
            <input
              id="priceMax"
              type="text"
              value={formData.priceMax}
              onChange={(e) => handleInputChange(e, 'priceMax')}
              className={css.slider_input}
            />
          </li>
        </ul>
        <Button text={"OK"} onClickHandler={handleSubmit} isDisabled={false} />
      </div>
    </>
  );
};
