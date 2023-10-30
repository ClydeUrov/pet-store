import css from "./ProductInstructions.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductById } from "../../../helpers/api";

const ProductInstructions = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(productId)
      .then(setProduct)
      .catch((error) => {
        console.log("Error", error);
      });
  }, [productId]);

  if (!product) {
    return;
  }

  return (
    <>
      <div className={css.box}>
        <h3 className={css.title}>Feeding instructions</h3>

        {product.instructions ? (
          <p className={css.text}>{product.instructions} </p>
        ) : (
          <p className={css.text}>No information</p>
        )}
      </div>
    </>
  );
};

export default ProductInstructions;
