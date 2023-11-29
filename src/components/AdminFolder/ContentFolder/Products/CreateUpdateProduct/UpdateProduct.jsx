import css from "./CreateUpdateProduct.module.scss";
import { Form, Formik } from "formik";
import DownloadImages from "./DownloadImages";
import FormikField from "../../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import { useEffect, useState } from "react";
import { fetchProductCharacteristics } from "../../../../../helpers/api";
import { updateCard } from "../../../../../redux/cards/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { schemaAdminProducts } from "../../../../../helpers/schemes";

const UpdateProduct = ({product, setEditProduct}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState({ id: product.mainImage?.id, url: product.mainImage?.filePath });
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
    notAvailable : [{id: 1, name: 'Available'}, {id: 2, name: 'Unavailable'}],
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
    if(values.notAvailable) { values.notAvailable = values.notAvailable.id === 1 ? true : false }
    if(values.size) { values.productSize = values.size }
    if (mainImage) {values.mainImage = mainImage}

    try {
      console.log(product, values)
      await toast.promise(dispatch(updateCard({ id: product.id, data: values })), {
        pending: "Request in progress",
        success: "Product updated successfully",
        error: "The product was not updated",
      })

    } catch (error) {
      console.error(error);
    } finally {
      navigate(0)
    }
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Product information</p>
      </div>

      <DownloadImages 
        images={images} setImages={setImages} productId={product.id} mainImage={mainImage} setMainImage={setMainImage} 
      />   
      
      <Formik
        validationSchema={schemaAdminProducts}
        initialValues={{
          name: product.name,
          description: product.description,
          instructions: product.instructions,
          contraindications: product.contraindications,
          prescription: product.prescription,
          priceWithDiscount: product.priceWithDiscount,
          price: product.price,
          age: product.age,
          brand: product.brand,
          category: product.category,
          color: product.color,
          material: product.material,
          size: product.productSize,
          weight: product.weight,
          notAvailable: { id: product.notAvailable === true ? 1 : 2 },
          mainImage: product.mainImage,
          newArrival: product.newArrival || true
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
          <div className={css.buttons}>
            <button type="submit" >Update</button>
            <button type="button" onClick={() => { navigate('/admin/products/'); setEditProduct(null); }} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProduct;
