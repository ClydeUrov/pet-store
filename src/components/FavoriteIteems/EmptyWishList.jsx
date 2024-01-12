import styles from "./EmptyWishList.module.scss";
import { CiHeart } from "react-icons/ci";

function EmptyWishList() {
  return (
    <div className={styles.wrapper}>
      <CiHeart size={64} />
      <h3>There's nothing here yet</h3>
    </div>
  );
}

export default EmptyWishList;
