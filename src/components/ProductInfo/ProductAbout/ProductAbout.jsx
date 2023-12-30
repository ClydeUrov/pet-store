import css from "./ProductAbout.module.scss";

const ProductAbout = ({ product }) => {
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
                {age?.name && (
                  <>
                    <td className={css.table_title}>
                      <p className={css.table_title_box}>Age</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{age.name}</td>
                  </>
                )}
              </tr>
              <tr className={css.table_row}>
                {productSize?.name && (
                  <>
                    <td className={css.table_title}>
                      {" "}
                      <p className={css.table_title_box}>Breed size</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{productSize.name}</td>
                  </>
                )}
              </tr>
              <tr className={css.table_row}>
                {weight?.name && (
                  <>
                    <td className={css.table_title}>
                      <p className={css.table_title_box}>Package weight</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{weight.name}</td>
                  </>
                )}
              </tr>
              <tr className={css.table_row}>
                {brand?.name && (
                  <>
                    <td className={css.table_title}>
                      <p className={css.table_title_box}>Brand</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{brand.name}</td>
                  </>
                )}
              </tr>
              <tr className={css.table_row}>
                {prescription?.name && (
                  <>
                    <td className={css.table_title}>
                      <p className={css.table_title_box}>Prescription</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{prescription.name}</td>
                  </>
                )}
              </tr>
              <tr className={css.table_row}>
                {contraindications && (
                  <>
                    <td className={css.table_title}>
                      <p className={css.table_title_box}>Contraindications</p>
                      <span className={css.line}></span>
                    </td>
                    <td className={css.table_data}>{contraindications}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductAbout;
