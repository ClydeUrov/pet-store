import { Link } from "react-router-dom";
import styles from "./BrandItemForSlider.module.scss";

function BrandItemForSlider({ item }) {
  return (
    <Link to="/catalogue/all">
      <div className={styles.container}>
        {!item.image ? (
          <h4>{item.name}</h4>
        ) : (
          <img
            // className={css.itemImg}
            src={item.image.filePath}
            alt={item.name}
            className={styles.image}
          />
        )}
      </div>
    </Link>
  );
}

export default BrandItemForSlider;
