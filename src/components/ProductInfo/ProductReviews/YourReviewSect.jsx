import StarRatingNew from "../../StarRatings/StarRatingNew";
import ButtonForReview from "./ButtonForReview";
import styles from "./YourReviewSect.module.scss";
import { FaRegUser } from "react-icons/fa";

function YourReviewSect() {
  function handleSetStarRating(e) {
    console.log(`You set rating to ${e}`);
  }
  function handleSubmitClick() {
    console.log("You press Submit Button");
  }
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Your Review</h3>
      <div className={styles.user_cont}>
        <i className={styles.icon}>
          <FaRegUser size={32} />
        </i>
        <span>User Name</span>
      </div>
      <div className={styles.rating_cont}>
        <span>Rate Product</span>
        <StarRatingNew
          size={28}
          color="#FFBD71"
          defaultRating={0}
          onSetRating={handleSetStarRating}
        />
      </div>
      <textarea
        name="review text"
        placeholder="Enter text"
        className={styles.text_input}
        required={true}
        minLength={12}
      />
      <ButtonForReview text="Submit" onClick={handleSubmitClick} />
    </div>
  );
}

export default YourReviewSect;
