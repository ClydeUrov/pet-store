import { useRef, useState } from "react";
import ButtonForReview from "./ButtonForReview";
import Review from "./Review";
import styles from "./ReviewsSection.module.scss";
import ButtonForSlider from "../../SliderForHomepage/ButtonForSlider";
const REVIEWS_PER_VIEEW = 5;

function ReviewsSection({ onAddReview }) {
  const [page, setPage] = useState(0);
  const reviewCont = useRef();

  const data = [
    {
      name: "Іван",
      review:
        "Цей новий когтеточ просто чудовий! Мій кіт любить на ньому дряпатися, і він добре виглядає у моєму домі.",
      rating: 5,
      date: "2023-12-13",
      id: 1,
    },
    {
      name: "Марія",
      review:
        "Ця нова їжа для моєї собаки дуже смачна! Вона їсть її з великим задоволенням, і її шерсть стала блискучою.",
      rating: 5,
      date: "2023-12-12",
      id: 2,
    },
    {
      name: "Петро",
      review:
        "Цей новий нашийник для моєї кішки дуже зручний і стильний. Вона не боїться його носити, і він добре тримається на її шиї.",
      rating: 4,
      date: "2023-12-11",
      id: 3,
    },
    {
      name: "Олена",
      review:
        "Ця нова іграшка для моєї собаки просто чудова! Вона її обожнює, і вона допомагає їй залишатися активною та здоровою.",
      rating: 5,
      date: "2023-12-10",
      id: 4,
    },
    {
      name: "Василь",
      review:
        "Цей новий лежак для моєї кішки просто ідеальний! Вона любить на ньому спати, і він дуже зручний.",
      rating: 5,
      date: "2023-12-09",
      id: 5,
    },
    {
      name: "Оля",
      review:
        "Цей новий корм для моєї собаки просто чудовий! Він не викликає алергії, і моя собака відчуває себе чудово.",
      rating: 5,
      date: "2023-12-08",
      id: 6,
    },
    {
      name: "Світлана",
      review:
        "Ця нова миска для моєї собаки просто чудова! Вона не брудниться, і її легко мити.",
      rating: 5,
      date: "2023-12-07",
      id: 7,
    },
    {
      name: "Богдан",
      review:
        "Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.  Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.Цей новий нашийник для моєї собаки просто чудовий! Він міцний і надійний, і він добре тримається на шиї.",
      rating: 5,
      date: "2023-12-06",
      id: 8,
    },

    {
      name: "Іван",
      review:
        "Ця нова їжа для моєї собаки просто чудова! Вона їсть її з великим задоволенням, і її шерсть стала блискучою.",
      rating: 5,
      date: "2023-12-13",
      id: 9,
    },
    {
      name: "Марія",
      review:
        "Цей новий нашийник для моєї кішки дуже зручний і стильний. Вона не боїться його носити, і він добре тримається на її шиї.",
      rating: 4,
      date: "2023-12-12",
      id: 10,
    },
    {
      name: "Петро",
      review:
        "Ця нова іграшка для моєї собаки просто чудова! Вона її обожнює, і вона допомагає їй залишатися активною та здоровою.",
      rating: 5,
      date: "2023-12-11",
      id: 11,
    },
  ];

  function handleChangePage(action) {
    if (action === "back" && page > 0) {
      setPage((page) => (page -= 1));
      reviewCont.current.scrollIntoView();
    }
    if (action === "forward" && page + 1 < Math.ceil(data.length / 5)) {
      setPage((page) => (page += 1));
      reviewCont.current.scrollIntoView();
    }
  }

  function dataPerPage(itemsPerPage, currentPage, data) {
    return data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }

  return (
    <div>
      <div className={styles.header_cont} ref={reviewCont}>
        <div className={styles.title_cont}>
          <h3>Reviews</h3>
          <p>
            {page * REVIEWS_PER_VIEEW + 1}-
            {(page + 1) * REVIEWS_PER_VIEEW > data.length
              ? data.length
              : (page + 1) * REVIEWS_PER_VIEEW}{" "}
            of
            {"  "}
            {data.length} Reviews
          </p>
        </div>
        <ButtonForReview text="Add review" onClick={onAddReview} />
      </div>

      <div className={styles.reviews_cont}>
        {dataPerPage(REVIEWS_PER_VIEEW, page, data).map((review) => {
          return <Review review={review} key={review.id} />;
        })}
      </div>
      <div className={styles.navigation_cont}>
        <ButtonForSlider
          size={24}
          type="prev"
          onClick={() => handleChangePage("back")}
        />
        <span className={styles.cur_page}>
          {page + 1}/{Math.ceil(data.length / 5)}
        </span>
        <ButtonForSlider
          size={24}
          type="next"
          onClick={() => handleChangePage("forward")}
        />
      </div>
    </div>
  );
}

export default ReviewsSection;
