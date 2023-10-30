import css from "./UserReviews.module.scss";
import { BiTrashAlt } from "react-icons/bi";
import { StarRating } from "../StarRatings/StarRatings";
//  import { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';

export const allReviews = [
  {
    name: "Lorem qaazxzde dxcrdxre fctrfgcdtr ",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ratione quibusdam amet similique natus facilis illo doloremque perferendis cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ratione quibusdam amet similique natus facilis illo doloremque perferendis cupiditate?",
    img: "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
    data: "26.07.2008",
    rating: 3,
  },
  {
    name: "Lorem qaazxzde ",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ",
    img: "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
    data: "26.07.2008",
    rating: 4,
  },
  {
    name: "Lorem qaazxzde dxcrdxre fctrfgcdtr zcdvxxdbvgfd",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ratione quibusdam amet similique natus facilis illo doloremque perferendis cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ratione quibusdam amet similique natus facilis illo doloremque perferendis cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt ratione quibusdam amet similique natus facilis illo doloremque perferendis cupiditate?",
    img: "https://pibig.info/uploads/posts/2022-06/1655666648_1-pibig-info-p-kartinki-leto-priroda-krasivo-1.jpg",
    data: "26.07.2008",
    rating: 5,
  },
];

const UserReviews = () => {
  // const [userReviews, setUserReviews] = useState({});
 
  //   const navigate = useNavigate();
  
  return (
    <>
      <h3 className={css.title}>Products You’ve Reviewed</h3>

      <table className={css.table}>
        <thead>
          <tr className={css.table_row}>
            <th className={css.table_header}>Item</th>
            <th className={css.table_header}></th>
            <th className={css.table_header}>Review</th>
          </tr>
        </thead>

        <tbody className={css.list}>
          {allReviews.map(({ name, review, img, data, rating }) => (
            <tr key={name}>
              <td  className={css.table_data}>
                <div className={css.img_cover}>
                  {img ? (
                    <img src={img} className={css.img} alt={name} />
                  ) : null}
                </div>
              </td>
              <td  className={css.table_data}>
                <p className={css.prod_name}>{name}</p>{" "}
              </td>
              <td  className={`${css.table_data} ${css.table_data_review}`}>
                <p className={css.review_data}>{data}</p>
                <p className={css.review_rating}>{StarRating(rating)}</p>
                <p className={css.review_text}>{review}</p>
                 <button type="button" className={css.icon} > <BiTrashAlt size={24} /></button>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.link}
                >
                  Go to
                </a>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserReviews;