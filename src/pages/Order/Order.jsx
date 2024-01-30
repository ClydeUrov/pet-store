import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./Order.module.scss";
import FormikField from "../../components/FormikFolder/FormikField";
import { address, contactInformation, delivery } from "./parameters";
import Button from "../../components/CustomButton/Button";
import { useConstants } from "../../helpers/routs/ConstantsProvider";
import OrderCard from "./OrderCard";
import { getUser } from "../../helpers/user.actions";
import { schemaForOrder } from "../../helpers/schemes";

const Order = () => {
  const localProducts = JSON.parse(localStorage.getItem("cart"));
  const user = getUser();
  const { constants } = useConstants();

  const handleSubmit = async (values) => {
    // const productIds = localProducts.map((item) => item.product.id)
    // values.products = productIds;
    console.log("values", values);
  };

  function CalculateTotalAmount() {
    const totalWithDiscount = localProducts.reduce((acc, item) => {
      let price = item.product.priceWithDiscount
        ? item.product.priceWithDiscount
        : item.product.price;
      return acc + price * item.quantity;
    }, 0);

    const totalWithoutDiscount = localProducts.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    return {
      totalWithDiscount: totalWithDiscount,
      totalWithoutDiscount: totalWithoutDiscount,
    };
  }

  const { totalWithDiscount, totalWithoutDiscount } = localProducts.length > 0 && CalculateTotalAmount();

  return (
    <div className={css.content}>
      <div className={css.orderForm}>
        <Formik
          validationSchema={schemaForOrder}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: '+',
            email: user.email,
            city: undefined,
            postalCode: undefined,
            houseNumber: undefined,
            apartment: undefined,
            deliveryOption: undefined,
            comment: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={css.form}>
              <h1 className={css.title}>
                Placing an order
              </h1>
              <section>
                <h2>Contact information</h2>
                <div className={css.product}>
                  {contactInformation.map((field) => (
                    <FormikField
                      key={`product_${field.name}`}
                      {...field}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h2>Delivery</h2>
                <div className={css.product}>
                  {delivery.map((field) => (
                    <FormikField
                      key={`product_${field.name}`}
                      {...field}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))}
                </div>
                <div className={css.radio}>
                  <Field
                    type="radio"
                    name="deliveryOption"
                    value="novaPoshta"
                    id="novaPoshta"
                  />
                  <label htmlFor="novaPoshta">Nova Poshta</label>
                </div>
                {values.deliveryOption === "novaPoshta" && (
                  <div style={{ marginLeft: "18px" }}>
                    <div className={css.radio}>
                      <Field
                        type="radio"
                        name="deliveryBy"
                        value="postOffice"
                        id="postOffice"
                      />
                      <label htmlFor="novaPoshta">Post Office</label>
                    </div>
                    <div className={css.radio}>
                      <Field
                        type="radio"
                        name="deliveryBy"
                        value="courierDelivery"
                        id="courierDelivery"
                      />
                      <label htmlFor="novaPoshta">Courier Delivery</label>
                      <ErrorMessage name="deliveryBy" component="p" className={css.error} />
                    </div>
                  </div>
                )}
                <div className={css.radio}>
                  <Field
                    type="radio"
                    name="deliveryOption"
                    value="ukrPoshta"
                    id="ukrPoshta"
                  />
                  <label htmlFor="ukrPoshta">Ukr Poshta</label>
                  <ErrorMessage name="deliveryOption" component="p" className={css.error} />
                </div>
                {values.deliveryOption === "ukrPoshta" && (
                  <div style={{ marginLeft: "18px" }}>
                    <div className={css.radio}>
                      <Field
                        type="radio"
                        name="deliveryBy"
                        value="postOffice"
                        id="postOffice"
                      />
                      <label htmlFor="ukrPoshta">Post Office</label>
                    </div>
                    <div className={css.radio}>
                      <Field
                        type="radio"
                        name="deliveryBy"
                        value="courierDelivery"
                        id="courierDelivery"
                      />
                      <label htmlFor="ukrPoshta">Courier Delivery</label>
                      <ErrorMessage name="deliveryBy" component="p" className={css.error} />
                    </div>
                  </div>
                )}
                <div className={css.addressBlock}>
                  {address.map((field) => (
                    <FormikField
                      key={`product_${field.name}`}
                      {...field}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h2>Payment</h2>
                <div className={css.radio}>
                  <Field
                    type="radio"
                    name="payment"
                    value="byCard"
                    id="byCard"
                  />
                  <label htmlFor="byCard">By card</label>
                </div>
                <div className={css.radio}>
                  <Field
                    type="radio"
                    name="payment"
                    value="byCash"
                    id="byCash"
                  />
                  <label htmlFor="byCash">By cash</label>
                  <ErrorMessage name="payment" component="p" className={css.error} />
                </div>
                <div className={css.commentContainer}>
                  <label htmlFor="comment" className={css.label}>
                    Add comment to the order
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    id="comment"
                    placeholder="Enter text"
                    className={css.textarea}
                  />
                  <ErrorMessage name="comment" component="p" className={css.error} />
                </div>
              </section>
              <div style={{ marginTop: "40px" }}>
                <button type="submit" >Create</button>
                {/* <button type="submit" onClick={() => handleSubmit(values)}>Submit</button> */}
                {/* <Button
                  type="submit"
                  text={"Confirm order"}
                  onClickHandler={() => handleSubmit()}
                  buttonSize="small"
                /> */}
              </div>
              {/* <button type="submit" >Submit</button>  */}
            </Form>
          )}
        </Formik>
      </div>
      <div className={css.orderlist}>
        <h2 style={{ margin: "20px", fontSize: "30px" }}>Сheck your order</h2>
        <div className={css.cartList}>
          {localProducts?.length > 0 &&
            localProducts.map((item) => (
              <OrderCard
                key={item.product.id}
                item={item}
                constants={constants}
              />
            ))}
        </div>
        <div className={css.totalPrice}>
          <p>Total price</p>
          <p>
            {localProducts.length > 0 ? (
              totalWithDiscount === totalWithoutDiscount ? (
                totalWithoutDiscount.toFixed(2)
              ) : (
                <>
                  <span className={css.cardPriceNot}>
                    {totalWithoutDiscount.toFixed(2)}
                  </span>{" "}
                  {totalWithDiscount.toFixed(2)}
                </>
              )
            ) : (0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
