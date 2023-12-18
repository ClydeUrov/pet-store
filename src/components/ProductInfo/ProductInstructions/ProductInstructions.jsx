import css from "./ProductInstructions.module.scss";

const ProductInstructions = ({ instructions }) => {
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
