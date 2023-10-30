import css from "./CreateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import Button from "../../../CustomButton/Button";

const CreateProduct = () => {

  const handleSubmit = async (values) => {
    console.log("Відправлено дані: ", values);
  };

  const initialValues = {};

  [...productInformation, ...additionalInformation].forEach((field) => {
    initialValues[field.name] = field.value || "";
  });

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Product information</p>
      </div>

      <DownloadImages />
      
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {() => (
        <Form className={css.form}>
          <h3>Product information</h3>
          <h4>Basic information</h4>
          <div className={css.product}>
            {productInformation.map((field, index) => {
              return <FormikField key={field.name} {...field} />
            })}
          </div>
          <h4>Additionsl information</h4>
          <div className={css.additions}>
            {additionalInformation.map((field, index) => {
              return <FormikField key={field.name} {...field} />
            })}
          </div>
          <div className={css.buttons}>
            <Button buttonSize={'padding'} text="Confirm" onClickHandler={handleSubmit}  />
            <Button buttonSize={'cancel'} text="Cancel" onClickHandler={handleSubmit} />
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
