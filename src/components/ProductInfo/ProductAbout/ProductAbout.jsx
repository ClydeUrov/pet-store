import css from "./ProductAbout.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductById } from "../../../helpers/api";

const ProductAbout = () => {
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

  const {
    description,
    age,
    productSize,
    weight,
    brand,
    prescription,
    contraindications,
  } = product;
  return (
    <>
      <div className={css.box}>
        <div className={css.box_item_description}>
          <h3 className={css.title}>Description</h3>

          {description ? (
            <p className={css.text}>{description}</p>
          ) : (
            <p className={css.text}>No information</p>
          )}
        </div>

        <div className={css.box_item_characteristics}>
          <h3 className={css.title}>Characteristics</h3>

          <table className={css.table}>
            <tbody className={css.list}>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  <p className={css.table_title_box}>Age</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {" "}
                  {age ? age.name : "No info"}{" "}
                </td>
              </tr>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  {" "}
                  <p className={css.table_title_box}>Breed size</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {productSize ? productSize : "No info"}{" "}
                </td>
              </tr>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  <p className={css.table_title_box}>Package weight</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {" "}
                  {weight ? weight.name : "No info"}{" "}
                </td>
              </tr>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  <p className={css.table_title_box}>Brand</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {" "}
                  {brand ? { brand } : "No info"}{" "}
                </td>
              </tr>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  <p className={css.table_title_box}>Prescription</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {" "}
                  {prescription ? prescription.name : "No info"}{" "}
                </td>
              </tr>
              <tr className={css.table_row}>
                <td className={css.table_title}>
                  <p className={css.table_title_box}>Contraindications</p>
                  <span className={css.line}></span>
                </td>
                <td className={css.table_data}>
                  {" "}
                  {contraindications ? contraindications : "No info"}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductAbout;
