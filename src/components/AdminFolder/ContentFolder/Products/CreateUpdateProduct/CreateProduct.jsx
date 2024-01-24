import css from "./CreateUpdateProduct.module.scss";
import { Form, Formik } from "formik";
import FormikField from "../../../../FormikFolder/FormikField";
import { productInformation, additionalInformation } from './parameters';
import { useEffect, useState } from "react";
import { fetchProductCharacteristics } from "../../../../../helpers/api";
import { createCard, } from "../../../../../redux/cards/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { schemaAdminProducts } from "../../../../../helpers/schemes";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
    console.log("values", values);
    values.notAvailable = values.notAvailable?.id === 1 ? true : false
    if(values.size) { values.productSize = values.size }
  
    try {
      const { payload } = await toast.promise(dispatch(createCard(values)), {
        pending: "Request in progress",
        success: "Product created successfully!",
        error: "The product was not created",
      })
      console.log(payload);
      navigate(`/admin/products/update/${payload.id}`)
    } catch (err) {
      console.log(err)
      err.response ? setError(err.response.data.message) : setError(err.message)
    }
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Create product</p>
      </div>
      
      <Formik
        validationSchema={schemaAdminProducts}
        initialValues={{
          name: "",
          description: undefined,
          instructions: undefined,
          contraindications:  undefined,
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
          notAvailable: undefined,
          mainImage: undefined,
          newArrival: true
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
            <button type="submit" >Create</button>
            <button type="button" onClick={() => navigate('/admin/products/')} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
