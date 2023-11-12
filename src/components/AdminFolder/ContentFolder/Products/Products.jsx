import { useEffect, useState } from "react";
import { deleteCard, getAllCards } from "../../../../redux/cards/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../../../../redux/cards/selectors";
import css from "./Products.module.scss";
import Pagination from "../../../Pagination/Pagination";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { Sort } from "../../../Sort/Sort";
import { NavLink } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import CreateProduct from "../CreateProduct/CreateProduct";
import { toast } from "react-toastify";

const ProductCards = ({ allCards, setPage, dispatch, setEditProduct, setPrevLength }) => {

  const handleDelete = async (itemId) => {
    try {
      await toast.promise(dispatch(deleteCard(itemId))
        .catch((error) => {
          console.error("Error fetching data:", error);
        }), {
          pending: "Promise is pending",
          success: "Product removed successfully",
          error: "The product was not deleted",
        }
      )

      setPrevLength(allCards.content.length - 1);

    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div style={{width:"100%"}}>
      <Sort />
      <div className={css.columnHeaders}>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Discount</p>
        <p>Brand</p>
        <p>New</p>
        <p>Available</p>
        <p></p>
      </div>
      {allCards.content.map((item) => (
        <div
          key={item.id}
          className={
            item.notAvailable
              ? css.productRow
              : `${css.productRow} ${css.notAvailable}`
          }
        >
          <div className={css.picture}>
            {item.mainImage && (
              <img src={item.mainImage.filePath} alt="" />
            )}
          </div>
          <div>{item.name}</div>
          <div>{item.category.name}</div>
          <div>${item.price}</div>
          <div>${item.priceWithDiscount ? item.priceWithDiscount : 0}</div>
          <div>{item.brand ? item.brand.name : "No brand"}</div>
          <div>{item.newArrival ? "Yes" : "No"}</div>
          <div>{item.notAvailable ? "In stock" : "Out of stock"}</div>
          <div>
            <MdOutlineEdit onClick={() => setEditProduct(item)} /> 
            <AiOutlineDelete onClick={() => handleDelete(item.id) } />
          </div>
        </div>
      ))}
      <Pagination
        className="pagination-bar"
        currentPage={allCards.pageable.pageNumber + 1}
        totalCount={allCards.totalElements}
        pageSize={allCards.size}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(selectCards);
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [prevLength, setPrevLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCards(page));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPrevLength(allCards?.content?.length);
      }
    };

    if (!allCards || allCards?.content?.length === 0 || page !== (allCards.pageable?.pageNumber + 1) || prevLength !== allCards?.content?.length) {
      fetchData();
    }
  }, [allCards, page, prevLength, dispatch]);

  if(editProduct)
    return (
      <CreateProduct product={editProduct} setEditProduct={setEditProduct}/>
    )
  else
    return (
      <div className={css.productContainer}>
        <div className={css.firstLine}>
          <p>Products</p>
          <div className={css.search}>
            <input type="text" placeholder="Quick search" />
          </div>
          <NavLink to={"create"} type="button" className={css.topButton}>
            Create
          </NavLink>
        </div>
        {isLoading ? (
          <Loader />
        ) : !allCards.content ? (
          <div className={css.firstLine}>No data available.</div>
        ) : (
          <ProductCards allCards={allCards} setPage={setPage} dispatch={dispatch} setEditProduct={setEditProduct} setPrevLength={setPrevLength}/>
        )}
      </div>
    );
};

export default Products;
