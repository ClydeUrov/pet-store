import css from "./UserInfo.module.scss";
// import { useState, useEffect } from 'react';
import {user} from '../UserAccount/UserAccount'

import { GoPencil } from 'react-icons/go';
import { useState } from "react";
// import { useDispatch } from "react-redux";
//import { useSelector } from 'react-redux';

import { Form, Formik } from "formik";
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

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleCancel = (props) => {
    props.handleReset();
    toggleDisabled();
  };

  const handleSubmit = async (formData) => {
    const newInfo = {
      country: formData.country,
      region: formData.region,
      city: formData.city,
      code: formData.code,
      street: formData.street,
      building: formData.building,
      flat: formData.flat,
    };
    console.log("newInfo", newInfo);
    // dispatch(addNewUser(newUser));
    toggleDisabled();
  };

  return (
    <>
      <h3 className={css.title}>Shipping information</h3>

      <Formik
        validationSchema={schemaUserShippingInfo}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className={css.form}>
            <FormikField
              name="country"
              type="text"
              label="Country"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="region"
              type="text"
              label="Region"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="city"
              type="text"
              label="City"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="code"
              type="text"
              label="Postal Code"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="street"
              type="text"
              label="Street"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="building"
              type="text"
              label="Building Number"
              width="100%"
              disabled={disabled}
              required
            />

            <FormikField
              name="flat"
              type="text"
              label="Flat Number (Optional)"
              width="100%"
              disabled={disabled}
              required
            />

            {disabled ? (
              <button type="button" onClick={toggleDisabled} className={css.button}>
                Edit
                <GoPencil size={20} className={css.btn__icon}/>
              </button>
            ) : (
              <ul className={css.list__btn}>
                <li className={css.item__btn}>
                  <button type="submit" className={css.button} >
                    Confirm
                  </button>
                </li>
                <li className={css.item__btn}>
                  <button type="button" onClick={() => handleCancel(props)} className={css.button}>
                    Cancel
                  </button>
                </li>
              </ul>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
