import css from "./UserInfo.module.scss";
// import { useState, useEffect } from 'react';
import {user} from '../UserAccount/UserAccount'

import { GoPencil } from 'react-icons/go';
import { useState } from "react";
// import { useDispatch } from "react-redux";
//import { useSelector } from 'react-redux';

import { ErrorMessage, Form, Formik, Field } from "formik";
import { schemaUserShippingInfo } from "../../helpers/schemes";


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
  const [disabledBtn, setDisabledBtn] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleBtnDisable = (e) => {
    setDisabledBtn(true);
  };
  const handleBtnEnable = (e) => {
    setDisabledBtn(false);
  };

  const handleCancel = (props) => {
    props.handleReset();
    toggleDisabled();
    handleBtnDisable();
    return;
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
    handleBtnDisable();
    return;
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
            <div className={css.input__wrapper}>
              <label htmlFor="country" className={css.label}>
                Country
              </label>
              <Field
                className={ (props.touched.country && props.errors.country) ? `${css.invalid} ${css.input}` : `${css.input}` }
                id="country"
                name="country"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <ErrorMessage
                name="country"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="region" className={css.label}>
                Region
              </label>
              <Field
                className={ (props.touched.region && props.errors.region) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="region"
                id="region"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <ErrorMessage name="region" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="city" className={css.label}>
                City
              </label>
              <Field
                className={ (props.touched.city && props.errors.city) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="city"
                id="city"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />
              <ErrorMessage name="city" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="code" className={css.label}>
                Postal Code
              </label>
              <Field
                className={ (props.touched.code && props.errors.code) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="code"
                id="code"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />

              <ErrorMessage name="code" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="street" className={css.label}>
                Street
              </label>
              <Field
                className={ (props.touched.street && props.errors.street) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="street"
                id="street"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />

              <ErrorMessage name="street" component="p" className={css.error} />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="building" className={css.label}>
                Building Number
              </label>
              <Field
                className={ (props.touched.building && props.errors.building) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="building"
                id="building"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
                required
              />

              <ErrorMessage
                name="building"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.input__wrapper}>
              <label htmlFor="flat" className={css.label}>
                Flat Number (Optional)
              </label>
              <Field
                className={ (props.touched.flat && props.errors.flat) ? `${css.invalid} ${css.input}` : `${css.input}` }
                name="flat"
                id="flat"
                type="text"
                disabled={disabled}
                onClick={handleBtnEnable}
              />

              <ErrorMessage name="flat" component="p" className={css.error} />
            </div>

            {disabled ? (
              <button
                type="button"
                onClick={toggleDisabled}
                className={css.button}
              >
                Edit
                <GoPencil size={20} className={css.btn__icon}/>
              </button>
            ) : (
              <ul className={css.list__btn}>
                <li className={css.item__btn}>
                  <button type="submit" className={css.button}
                  disabled={disabledBtn}>
                    Confirm
                  </button>
                </li>
                <li className={css.item__btn}>
                  <button
                    type="button"
                    onClick={() => handleCancel(props)}
                    className={css.button}
                  >
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
