import { useState } from "react";
import css from "./ProductReviews.module.scss";
import ReviewsSection from "./ReviewsSection";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchProductById } from "../../../helpers/api";
// import { StarRate } from "../../StarRatings/StarRatings";

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

// const ProductReviews = () => {

//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchProductById(productId)
//       .then(setProduct)
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   }, [productId]);

//   if (!product) {
//     return;
//   }

//   return (

// <>
// <div className={css.box}>
//   <h3 className={css.title}>Your Review</h3>

//   <div className={css.review_form_box}>
//     <div className={css.review_user}>
//     <div className={css.review_user_img}>img</div>
//     <div className={css.review_user_name}>name</div>
//     </div>

//     <div className={css.review_rate_box}>
// <p className={css.review_rate_title}>Rate product</p>
//     <StarRate/>
//     </div>

//     <div >form</div>
//   </div>

//   <div className={css.review_list}>
//   <h3 className={css.title}>Reviews</h3>
//   </div>
// </div>
// </>

//   )
// }

// export default ProductReviews;
