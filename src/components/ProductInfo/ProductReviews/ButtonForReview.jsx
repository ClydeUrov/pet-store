import styles from "./ButtonForReview.module.scss";

function ButtonForReview({ text, onClick }) {
  return (
    <a href="#0" onClick={onClick} className={styles.btn}>
      {text}
    </a>
  );
}

export default ButtonForReview;
