import { Link } from "react-router-dom";
import styles from "./BrandItemForSlider.module.scss";

function BrandItemForSlider({ item }) {
  return (
    <div className={styles.container}>
      {/* {item.image.filePath ?} */}
      <Link to="/catalogue/all">
        {!item.image ? (
          <div className={styles.no_img}>
            <h4>{item.name}</h4>
          </div>
        ) : (
          <img
            // className={css.itemImg}
            src={item.image.filePath}
            alt={item.name}
            className={styles.image}
          />
        )}
      </Link>
    </div>
  );
}

export default BrandItemForSlider;
