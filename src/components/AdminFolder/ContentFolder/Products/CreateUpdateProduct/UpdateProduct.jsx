import css from "./CreateUpdateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import { useEffect, useState } from "react";
import { fetchProductCharacteristics } from "../../../../../helpers/api";
import { updateCard } from "../../../../../redux/cards/operations";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { schemaAdminProducts } from "../../../../../helpers/schemes";

const UpdateProduct = ({ product, setUpdateProduct, fetchData }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState(
    product.mainImage ? { id: product.mainImage.id, url: product.mainImage.filePath } : null
  );
  const [images, setImages] = useState(product.images || []);

  const [characteristics, setCharacteristics] = useState({
    age : [],
    brand : [],
    category : [],
    color : [],
    material : [],
    prescription : [],
    size : [],
    weight : [],
    notAvailable : [{id: 1, name: 'Unavailable'}, {id: 2, name: 'Available'}],
  });

  useEffect(() => {
    async function loadCharacteristics() {
      try {
        const data = await toast.promise(fetchProductCharacteristics(), {
          pending: "Fetching characteristics in progress",
          error: "Characteristics were not loaded"
        });
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

  const handleSubmit = async (values) => {
    values.notAvailable = values.notAvailable.id === 1 ? true : false
    if(values.size) { values.productSize = values.size }
    if(mainImage) {values.mainImage = mainImage}
  
    try {
      await toast.promise(dispatch(updateCard({ id: product.id, data: values })), {
        pending: "Request in progress",
        success: "Product updated successfully",
        error: "The product was not updated",
      })
      setUpdateProduct(null);
      fetchData();
    } catch (err) {
      err.response ? setError(err.response.data.message) : setError(err.message)
    }
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Product information</p>
      </div>

      <DownloadImages 
        images={images} setImages={setImages} productId={product?.id} mainImage={mainImage} setMainImage={setMainImage} 
      />
      
      <Formik
        validationSchema={schemaAdminProducts}
        initialValues={{
          name: product.name,
          description: product?.description || undefined,
          instructions: product?.instructions || undefined,
          contraindications: product?.contraindications || undefined,
          prescription: product?.prescription || undefined,
          priceWithDiscount: product?.priceWithDiscount || undefined,
          price: product.price,
          age: product?.age || undefined,
          brand: product?.brand || undefined,
          category: product.category,
          color: product?.color || undefined,
          material: product?.material || undefined,
          size: product?.productSize || undefined,
          weight: product?.weight || undefined,
          notAvailable: { id: product?.notAvailable === true ? 1 : 2 } || undefined,
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
              <FormikField 
                key={`product_${field.name}`} 
                {...field} 
                optionList={field.type === "select" && characteristics ? characteristics[field.name] : null}
                values={values}
                setFieldValue={setFieldValue}
              />
            ))}
          </div>
          <h4>Additions information</h4>
          <div className={css.additions}>
            {additionalInformation.map((field) => {
              return <FormikField
                key={`additional_${field.name}`}
                {...field}
                optionList={field.type === "select" && characteristics ? characteristics[field.name] : null}
                values={values}
                setFieldValue={setFieldValue}
              />
            })}
          </div>
          {error && <p>{error}</p>}
          <div className={css.buttons}>
            <button type="submit" >Update</button>
            <button type="button" onClick={() => setUpdateProduct(null)} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProduct;
