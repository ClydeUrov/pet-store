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

const ProductCards = ({ allCards, setPage, dispatch, setEditProduct }) => {

  const handleDelete = async (itemId) => {
    console.log("delete", itemId);
    const hasConfirmed = window.confirm("Are you sure you want to remove this product?");

    if(hasConfirmed) {
      try {
        await dispatch(deleteCard(itemId)).catch((error) => {
          console.error("Error fetching data:", error);
        });
        console.log("deleted");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section>
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
            {item.images && item.images.length > 0 && (
              <img src={item.images[0].filePath} alt="" />
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
    </section>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(selectCards);
  const isLoading = useSelector(({ cards }) => cards.isLoading);
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (
      !allCards || !allCards.content || page !== allCards.pageable.pageNumber + 1
    ) {
      dispatch(getAllCards(page)).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [dispatch, allCards, page]);

  if(editProduct)
    return (
      <CreateProduct product={editProduct} />
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
        ) : !allCards || allCards.content || allCards.length === 0 ? (
          <div className={css.firstLine}>No data available.</div>
        ) : (
          <ProductCards allCards={allCards} setPage={setPage} dispatch={dispatch} setEditProduct={setEditProduct}/>
        )}
      </div>
    );
};

export default Products;
