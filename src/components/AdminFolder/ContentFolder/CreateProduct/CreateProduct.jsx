import css from "./CreateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import { useEffect, useState } from "react";
import { addImagesToCard, fetchProductCharacteristics } from "../../../../helpers/api";
import { createCard, updateCard } from "../../../../redux/cards/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [characteristics, setCharacteristics] = useState({
    age : [{ id: 2, name: '4-6' }, { id: 3, name: '6-9' }],
    brand : [{ id: 1, name: 'Brandddd' },],
    category : [],
    color : [],
    material : [],
    prescription : [],
    size : [],
    weight : [],
    notAvailable : [{id: true, name: 'Available'}, {id: false, name: 'Unavailable'}],
  });

  useEffect(() => {
    async function loadCharacteristics() {
      try {
        const data = await fetchProductCharacteristics();
        setCharacteristics(prevCharacteristics => ({
          ...prevCharacteristics,
          ...data,
        }));
      } catch (error) {
        console.error(error);
      }
    }

    loadCharacteristics();
  }, []);

  // console.log(characteristics);

  const formValue = (values) => {
    const items = ["age", "brand", "color", "material", "category", "size", "weight"]

    items.forEach((item) => {
      if(values[item] && values[item].length !== 0) {
        // console.log("item", values[item]);
        values[item] = {"id": parseInt(values[item])}
      }
      if(values.notAvailable && values.notAvailable.length !== 0) {
        values.notAvailable === "false" ? values.notAvailable = false : values.notAvailable = true
      }
    })
    return values
  }

  const handleSubmit = async (values) => {
    console.log(values);
    const submitForm = formValue(values);
  
    if (product) {
      try {
        const card = await dispatch(updateCard({ id: product.id, data: submitForm }));
        console.log(card);
  
        await dispatch(addImagesToCard());
      } catch (error) {
        console.error(error);
      } finally {
        navigate(-1)
      }
    } else {

      try {
        const card = await dispatch(createCard(submitForm));
        console.log(card);

        await dispatch(addImagesToCard());
      } catch (error) {
        console.error(error);
      } finally {
        navigate(-1)
      }
    }
  };

  const prod = {
    name: "My name",
    age: { id: 2, name: '4-6' },
    notAvailable: { id: true, name: 'Available' },
    brand: { id: 1, name: 'Brandddd' }
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        {product
          ? (<p>Product information</p>)
          : (<p>Create product</p>)
        }
      </div>

      <DownloadImages />
      
      <Formik
        initialValues={{
          name: prod?.name || "",
          description: product?.description || "descriptionS",
          instruction: product?.instruction || undefined,
          contraindications: product?.contraindications || undefined,
          prescription: product?.prescription || undefined,
          priceWithDiscount: product?.priceWithDiscount || undefined,
          price: product?.price || 0,
          age: prod?.age.id || undefined,
          brand: product?.brand.id || undefined,
          category: product?.category.id || undefined,
          color: product?.color.id || undefined,
          material: product?.material.id || undefined,
          size: product?.size.id || undefined,
          weight: product?.weight.id || undefined,
          notAvailable: prod?.notAvailable.id || false,
          mainImage: product?.mainImage || undefined,
          newArrival: product?.newArrival || true
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <h3>Product information</h3>
          <h4>Basic information</h4>
          <div className={css.product}>
            {productInformation.map(field => (
              <div key={`product_${field.name}`}>
                <FormikField 
                  key={`product_${field.name}`} 
                  {...field} 
                  optionList={field.type === "select" && characteristics ? characteristics[field.name] : null}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
            ))}
          </div>
          <h4>Additions information</h4>
          <div className={css.additions}>
            {additionalInformation.map(field => {
              return <FormikField key={`additional_${field.name}`} {...field} />
            })}
          </div>
          <div className={css.buttons}>
            <button type="submit" >Confirm</button> 
            <button type="cancel" onClick={() => navigate(-1)} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
