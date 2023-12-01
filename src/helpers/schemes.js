import * as yup from "yup";

export const schemaSignUp = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Minimum 2 characters!")
    .max(24, "Maximum 24 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  lastName: yup
    .string()
    .min(4, "Minimum 4 characters!")
    .max(120, "Maximum 120 characters!")
    .required("Required field!"),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Correct format: mail@ukr.net or mail@gmail.com"
    )
    .required("Email is required!"),
  password: yup
    .string()
    .matches(/^[^\s]*$/, "Must not contain spaces!")
    .min(7, "Minimum 7 characters!")
    .max(32, "Password must contain no more than 32 characters!")
    .required("Password is required!"),
});

export const schemaLogIn = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Correct format: mail@ukr.net or mail@gmail.com"
    )
    .required("Email is required!"),
  password: yup
    .string()
    .matches(/^[^\s]*$/, "Must not contain spaces!")
    .min(7, "Minimum 7 characters!")
    .max(32, "Password must contain no more than 32 characters!")
    .required("Password is required!"),
});

export const schemaUserPersonalInfo = yup.object().shape({
  name: yup
    .string()
    .min(2, "Minimum 2 characters!")
    .max(24, "Maximum 24 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  surname: yup
    .string()
    .min(4, "Minimum 4 characters!")
    .max(120, "Maximum 120 characters!")
    .required("Required field!"),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Correct format: mail@ukr.net or mail@gmail.com"
    )
    .required("Required field!"),
  password: yup
    .string()
    .matches(/^[^\s]*$/, "Must not contain spaces!")
    .min(7, "Minimum 7 characters!")
    .max(32, "Password must contain no more than 32 characters!")
    .required("Password is required!"),
  confirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Confirm password must match the password!"
    )
    .required("Required!"),
});

export const schemaUserShippingInfo = yup.object().shape({
  country: yup
    .string()
    .min(3, "Minimum 3 characters!")
    .max(60, "Maximum 60 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  region: yup
    .string()
    .min(4, "Minimum 4 characters!")
    .max(60, "Maximum 60 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  city: yup
    .string()
    .min(4, "Minimum 4 characters!")
    .max(60, "Maximum 60 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  street: yup
    .string()
    .min(4, "Minimum 4 characters!")
    .max(60, "Maximum 60 characters!")
    .matches(/^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-']+$/, "Can only contain letters!")
    .required("Required field!"),
  code: yup
    .string()
    .min(4, "Minimum 4 digits!")
    .max(12, "Maximum 12 digits!")
    .matches(/^[1-9]\d*([,.]\d+)?$/, "Postal Code must be a number!")
    .required("Required field!"),
  building: yup
    .string()
    .max(12, "Maximum 12 digits!")
    .matches(/^[1-9]\d*([,.]\d+)?$/, "Building Number must be a number!")
    .required("Required field!"),
  flat: yup
    .string()
    .matches(/^[1-9]\d*([,.]\d+)?$/, "Flat Number must be a number!")
    .max(120, "Maximum 12 digits!"),
});

export const schemaAdminProducts = yup.object().shape({
  name: yup
    .string()
    .min(2, "Minimum 2 characters!")
    .max(24, "Maximum 24 characters!")
    .matches(/^[0-9A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s\-.'",!@#$%^&*()_+=]+$/, )
    .required("Required field!"),
  price: yup
    .number()
    .positive("Price must be greater than zero")
    .test('is-positive', 'Price must be greater than zero', (value) => value > 0)
    .required("Required field!"),
  priceWithDiscount: yup
    .number()
    .positive("Price must be greater than zero"),
  category: yup
    .object()
    .required("Required field!"),
  brand: yup.object(),

  material: yup.object(),

  color: yup.object(),

  age: yup.object(),

  size: yup.object(),

  weight: yup.object(),

  notAvailable: yup.mixed(),

  prescription: yup.object(),

  contraindication: yup.string(),

  description: yup.string(),

  instruction: yup.string(),
});