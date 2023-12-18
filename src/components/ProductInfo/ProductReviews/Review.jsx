import StarRatingNew from "../../StarRatings/StarRatingNew";
import ButtonForReview from "./ButtonForReview";
import styles from "./Review.module.scss";
import { FaUserNinja } from "react-icons/fa6";

function Review({ review }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header_cont}>
        <div className={styles.profile_cont}>
          <i>
            <FaUserNinja size={36} />
          </i>
          <span>{review.name}</span>
        </div>
        <span>{review.date}</span>
      </div>
      <StarRatingNew
        size={24}
        color="#FFBD71"
        defaultRating={review.rating}
        active={false}
      />

      <p className={styles.review_text}>{review.review}</p>
    </div>
  );
}

export default Review;
