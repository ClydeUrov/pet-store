import { useState } from "react";
import css from "./ProductReviews.module.scss";
import ReviewsSection from "./ReviewsSection";

import YourReviewSect from "./YourReviewSect";

function ProductReviews() {
  const [activeAddReview, setActiveAddReview] = useState(false);
  function handleAddReview() {
    setActiveAddReview(!activeAddReview);
  }
  return (
    <div className={css.wrapper}>
      {activeAddReview && <YourReviewSect />}
      <ReviewsSection onAddReview={handleAddReview} />
    </div>
  );
}

export default ProductReviews;
