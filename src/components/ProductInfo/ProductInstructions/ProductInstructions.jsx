import css from "./ProductInstructions.module.scss";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchProductById } from "../../../helpers/api";

const ProductInstructions = ({ instructions }) => {
  // const { productId } = useParams();
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   fetchProductById(productId)
  //     .then(setProduct)
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // }, [productId]);

  if (!instructions) {
    return <h3>No instructions for now</h3>;
  }

  return (
    <>
      <div className={css.box}>
        <h3 className={css.title}>Feeding instructions</h3>

        {instructions ? (
          <p className={css.text}>{instructions}</p>
        ) : (
          <p className={css.text}>No information</p>
        )}
      </div>
    </>
  );
};

export default ProductInstructions;
