import { useEffect, useState } from "react";
import { getAllCards } from "../../../../redux/cards/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../../../../redux/cards/selectors";
import css from "./Products.module.scss";
import Sort from "../../../Sort/Sort";
import { NavLink } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import CreateUpdateProduct from "./CreateUpdateProduct/CreateUpdateProduct";
import ProductCards from "./ProductCards";

const Products = ({product}) => {
  const dispatch = useDispatch();
  const allCards = useSelector(selectCards);
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState(product);
  const [prevLength, setPrevLength] = useState(0);
  const [sortMethod, setSortMethod] = useState("");
  const [prevSort, setPrevSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [nameLike, setNameLike] = useState('');
  const [prevName, setPrevName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getAllCards({ page, sortMethod, nameLike }));
        return;
      } catch (err) {
        setError(`Error fetching data: ${err.response ? err.response.data.message : err.message}`)
      } finally {
        setPrevLength(allCards?.content?.length);
        setPrevSort(sortMethod || '');
        setPrevName(nameLike || '');
      }
    };

    if (
      !allCards ||
      allCards?.content?.length === 0 ||
      page !== (allCards.pageable?.pageNumber + 1) ||
      prevLength !== allCards?.content?.length ||
      sortMethod !== prevSort 
    ) {
      fetchData()
    }
    const delayTimer = setTimeout(() => {
      if (nameLike !== prevName) fetchData();
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, [allCards, page, prevLength, dispatch, sortMethod, nameLike]);

  const handleInputChange = (e) => {
    setNameLike(e.target.value);
    setPage(1);
  };

  if (editProduct) {
    return (
      <CreateUpdateProduct product={editProduct} setEditProduct={setEditProduct} />
    );
  } else
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
            setEditProduct={setEditProduct} 
            setPrevLength={setPrevLength}
          />
        )}
      </div>
    );
};

export default Products;
