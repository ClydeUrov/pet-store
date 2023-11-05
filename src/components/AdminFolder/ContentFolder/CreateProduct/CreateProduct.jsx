import css from "./CreateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import { useEffect, useState } from "react";
import { addImagesToCard, fetchProductCharacteristics } from "../../../../helpers/api";
import { addCard } from "../../../../redux/cards/operations";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader/Loader";

const formValues = {
  name: "",
  description: undefined,
  instruction: undefined,
  contraindications: undefined,
  prescription: undefined,
  priceWithDiscount: undefined,
  price: 0,
  age: undefined,
  brand: undefined,
  category: undefined,
  color: undefined,
  material: undefined,
  size: undefined,
  weight: undefined,
  mainImage: undefined,
  notAvailable: false,
  newArrival: true
};

const CreateProduct = ({productId}) => {
  const dispatch = useDispatch();
  const [characteristics, setCharacteristics] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductCharacteristics();
        setCharacteristics(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const fieldsToMap = ['brand', 'category', 'material', 'age', 'color', 'size', 'weight', 'prescription'];
    fieldsToMap.forEach((field) => {
      if (values[field]) {
        values[field] = { "id": parseInt(values[field]) };
      }
    });

    const card = await dispatch(addCard(values));

    console.log(card.payload)
  };

  const handleCancel = () => {
    console.log("cancel")
  }

  if (characteristics === null) {
    return <Loader />;
  }

  const characteristicsMap = {
    age: characteristics.ageDtoList,
    color: characteristics.colorDtoList,
    material: characteristics.materialDtoList,
    brand: characteristics.brandDtoList,
    prescription: characteristics.prescriptionDtoList,
    category: characteristics.productCategoryDtoList,
    size: characteristics.productSizeDtoList,
    weight: characteristics.weightDtoList,
    notAvailable: [{id: true, name: "True"}, {id: false, name: "False"}]
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Product information</p>
      </div>

      <DownloadImages />
      
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
      >
        {() => (
        <Form className={css.form}>
          <h3>Product information</h3>
          <h4>Basic information</h4>
          <div className={css.product}>
            {productInformation.map(field => {
              return <FormikField 
                key={`product_${field.name}`} 
                {...field} 
                data={field.type === "select" ? characteristicsMap[field.name] : null}
              />
            })}
          </div>
          <h4>Additionsl information</h4>
          <div className={css.additions}>
            {additionalInformation.map(field => {
              return <FormikField key={`additional_${field.name}`} {...field} />
            })}
          </div>
          <div className={css.buttons}>
            <button type="submit" >Confirm</button> 
            <button type="cancel" onClick={handleCancel} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
