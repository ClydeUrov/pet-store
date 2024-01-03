import { useCallback, useEffect, useState } from "react";
import { getAllCards } from "../../../../redux/cards/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../../../../redux/cards/selectors";
import css from "./Products.module.scss";
import Sort from "../../../Sort/Sort";
import { NavLink } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import ProductCards from "./ProductCards";
import Button from "../../../CustomButton/Button";

const Products = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(selectCards);
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const [page, setPage] = useState(1);
  const [prevLength, setPrevLength] = useState(0);
  const [sortMethod, setSortMethod] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [nameLike, setNameLike] = useState('');
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    try {
      dispatch(getAllCards({ page, sortMethod, nameLike }));
      return;
    } catch (err) {
      setError(`Error fetching data: ${err.response ? err.response.data.message : err.message}`)
    } finally {
      setPrevLength(allCards?.content?.length);
    }
  }, [dispatch, page, sortMethod, nameLike, allCards?.content?.length]);

  const filter =
    !allCards || prevLength !== allCards.content?.length ||
    page !== (allCards.pageable?.pageNumber + 1) || sortMethod !== '';

  useEffect(() => {
    if (filter) {
      fetchData();
    }

    const delayTimer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, [filter, page, sortMethod, fetchData]);

  const handleInputChange = useCallback((e) => {
    setNameLike(e.target.value);
    setPage(1);
  }, []);

  console.log("ASK fetcher")

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Products</p>
        <div className={css.search}>
          <input
            type="text"
            placeholder="Quick search"
            value={nameLike}
            onChange={handleInputChange}
          />
        </div>
        <Button text={"Create"} buttonSize="cancel">

        </Button>
        <NavLink to={"create"} type="button" className={css.topButton}>
          Create
        </NavLink>
      </div>
      <Sort setSortMethod={setSortMethod} isOpen={isOpen} setIsOpen={setIsOpen}/>
      {isLoading ? (
        <Loader />
      ) : !allCards?.content ? (
        <div className={css.firstLine}>No data available.</div>
      ) : error ? (
        <div className={css.firstLine} style={{color:"darkred"}}>
          {error} <br /> Please refresh the page
        </div>
      ) : (
        <ProductCards 
          allCards={allCards} 
          setPage={setPage} 
          dispatch={dispatch} 
          setPrevLength={setPrevLength}
        />
      )}
    </div>
  );
};

export default Products;
