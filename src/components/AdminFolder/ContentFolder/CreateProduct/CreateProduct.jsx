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
import { toast } from "react-toastify";
import { schemaAdminProducts } from "../../../../helpers/schemes";

const CreateProduct = ({product, setEditProduct}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(product?.mainImage ? { url: product.mainImage.filePath } : null);
  const [images, setImages] = useState(product?.images || []);

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
    if(values.notAvailable) {
      values.notAvailable = values.notAvailable.id === 1 ? true : false
    }
    if(values.size) {
      values.productSize = values.size
    }
  
    if (product) {
      try {
        let card
        if(mainImage && mainImage.id >= 0) {
          const updatedPayload = {
            ...product,
            mainImage: {id: mainImage.id}
          };
          card = await toast.promise(dispatch(updateCard({ id: product.id, data: updatedPayload })), {
            pending: "Request in progress",
            success: "Product updated successfully",
            error: "The product was not updated",
          })
        } else {
          card = await toast.promise(dispatch(updateCard({ id: product.id, data: values })), {
            pending: "Request in progress",
            success: "Product updated successfully",
            error: "The product was not updated",
          })
        }
        
        if (images && images.length > 0 && images.some(element => element instanceof File)) {
          const formData = new FormData();
          images.forEach(element => {
            if (element !== undefined && element instanceof File) {
              formData.append("images", element);
            }
          });
          const newImages = await addImagesToCard(product.id, formData);
          
          if(mainImage && mainImage.index >= 0){
            const updatedPayload = {
              ...card.payload,
              images: [...newImages],
              mainImage: newImages[mainImage.index]
            };
            dispatch(updateCard({ id: product.id, data: updatedPayload }))
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        navigate(0)
      }
    } else {
      console.log("here in create")
      try {
        const card = await toast.promise(dispatch(createCard(values)), {
          pending: "Request in progress",
          success: "Product created successfully!",
          // error: "The product was not created",
        })

        if (images && images.length > 0) {
          const formData = new FormData();
          images.forEach(element => {
            if (element !== undefined) {
              formData.append("images", element);
            }
          });
          const newImages = await addImagesToCard(card.payload.id, formData);
          if(mainImage && mainImage.index >= 0){
            const updatedPayload = {
              ...card.payload,
              images: newImages,
              mainImage: newImages[mainImage.index]
            };
            dispatch(updateCard({ id: card.payload.id, data: updatedPayload }))
          }
          if(mainImage && mainImage.id >= 0) {
            console.log(mainImage.id)
            const updatedPayload = {
              ...card.payload,
              mainImage: card.payload.images.find(image => image.id === mainImage.id),
              images: newImages,
            };
            dispatch(updateCard({ id: card.payload.id, data: updatedPayload }))
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        navigate(-1)
      }
    }
  };

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        {product
          ? (<p>Product information</p>)
          : (<p>Create product</p>)
        }
      </div>

      <DownloadImages 
        images={images} setImages={setImages} productId={product?.id} mainImage={mainImage} setMainImage={setMainImage} 
      />
      
      <Formik
        validationSchema={schemaAdminProducts}
        initialValues={{
          name: product?.name || "",
          description: product?.description || undefined,
          instructions: product?.instructions || undefined,
          contraindications: product?.contraindications || undefined,
          prescription: product?.prescription || undefined,
          priceWithDiscount: product?.priceWithDiscount || undefined,
          price: product?.price || 0,
          age: product?.age || undefined,
          brand: product?.brand || undefined,
          category: product?.category || undefined,
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
          <div className={css.buttons}>
            {product ? <button type="submit" >Update</button> : <button type="submit" >Confirm</button>} 
            <button type="button" onClick={() => { navigate('/admin/products/'); product && setEditProduct(null); }} >Cancel</button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
