import css from "./CreateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import Button from "../../../CustomButton/Button";

const CreateProduct = ({productId}) => {

  const handleSubmit = async (values) => {
    console.log("Відправлено дані: ", values);
  };

  const initialValues = {
    description: "",
    age: "",
    availability: "",
    brand: "",
    category: "",
    color: "",
    contraindications: "",
    instruction: "",
    material: "",
    name: "",
    prescription: "",
    price_discount: "",
    price_unit: "",
    size: "",
    undefined: "",
    weight: ""
  };

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
            {productInformation.map(field => {
              return <FormikField key={`product_${field.name}`} {...field} />
            })}
          </div>
          <h4>Additionsl information</h4>
          <div className={css.additions}>
            {additionalInformation.map(field => {
              return <FormikField key={`additional_${field.name}`} {...field} />
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
