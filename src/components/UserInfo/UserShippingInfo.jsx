import css from "./UserInfo.module.scss";
// import { useState, useEffect } from 'react';
import { user } from "../UserAccount/UserAccount";

import { GoPencil } from "react-icons/go";
import { useState } from "react";
// import { useDispatch } from "react-redux";
//import { useSelector } from 'react-redux';

import { Form, Formik, useFormik } from "formik";
import { schemaUserShippingInfo } from "../../helpers/schemes";
import FormikField from "../FormikFolder/FormikField";

const initialValues = {
  country: user.country,
  region: user.region,
  city: user.city,
  code: user.code,
  street: user.street,
  building: user.building,
  flat: user.flat,
};

export const UserShippingInfo = () => {
  const [disabled, setDisabled] = useState(true);

  const { values, handleSubmit, handleReset, handleChange } = useFormik({
    initialValues: {
      country: "",
      region: "",
      city: "",
      code: "",
      street: "",
      building: "",
      flat: "",
    },
    validationSchema: schemaUserShippingInfo,
    onSubmit: function (e) {
      console.log(e);
      toggleDisabled();
    },
  });

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleCancel = () => {
    handleReset();
    toggleDisabled();
  };

  // const handleSubmit = async (formData) => {
  //   const newInfo = {
  //     country: formData.country,
  //     region: formData.region,
  //     city: formData.city,
  //     code: formData.code,
  //     street: formData.street,
  //     building: formData.building,
  //     flat: formData.flat,
  //   };
  //   console.log("newInfo", newInfo);
  //   // dispatch(addNewUser(newUser));
  //   toggleDisabled();
  // };

  return (
    <>
      <h3 className={css.title}>Shipping information</h3>

      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.country}
          required
        />
        <label htmlFor="Region">Region</label>

        <input
          name="region"
          type="text"
          id="Region"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.region}
          required
        />
        <label htmlFor="City">City</label>

        <input
          name="city"
          type="text"
          id="City"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.city}
          required
        />
        <label htmlFor="PostalCode">Postal Code</label>

        <input
          name="code"
          type="text"
          id="PostalCode"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.code}
          required
        />
        <label htmlFor="Street">Street</label>

        <input
          name="street"
          type="text"
          id="Street"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.street}
          required
        />
        <label htmlFor="BuildingNumber">Building Number</label>

        <input
          name="building"
          type="text"
          id="BuildingNumber"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.building}
          required
        />
        <label htmlFor="FlatNumber">Flat Number</label>

        <input
          name="flat"
          type="text"
          id="FlatNumber (Optional)"
          width="100%"
          disabled={disabled}
          onChange={handleChange}
          value={values.flat}
        />

        {disabled ? (
          <button type="button" onClick={toggleDisabled} className={css.button}>
            Edit
            <GoPencil size={20} className={css.btn__icon} />
          </button>
        ) : (
          <ul className={css.list__btn}>
            <li className={css.item__btn}>
              <button type="submit" className={css.button}>
                Confirm
              </button>
            </li>
            <li className={css.item__btn}>
              <button
                type="button"
                onClick={() => handleCancel()}
                className={css.button}
              >
                Cancel
              </button>
            </li>
          </ul>
        )}
      </form>
    </>
  );
};
