import { useEffect, useState } from "react";
import { deleteCard, getAllCards } from "../../../../redux/cards/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../../../../redux/cards/selectors";
import css from "./Products.module.scss";
import Pagination from "../../../Pagination/Pagination";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import Sort from "../../../Sort/Sort";
import { NavLink } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import CreateUpdateProduct from "./CreateUpdateProduct/CreateUpdateProduct";
import { toast } from "react-toastify";
import Modal from "../../../Modal/Modal";
import ConfirmDeletion from "../../ContentFolder/ConfirmDeletion";

const ProductCards = ({ allCards, setPage, dispatch, setEditProduct, setPrevLength }) => {
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleConfirmDeletion = async () => {
    try {
      await toast.promise(
        dispatch(deleteCard(deleteItemId)), 
          {
            pending: "Promise is pending",
            error: "The product was not deleted",
          }
      );
      setPrevLength(allCards.content.length - 1);
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{width:"100%", marginBottom:"40px"}}>
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
            <AiOutlineDelete onClick={() => {setDeleteItemId(item.id); setDeleteModal(true);} } />
          </div>
        </div>
      ))}
      <Pagination
        className="pagination-bar"
        currentPage={allCards.number + 1}
        totalCount={allCards.totalElements}
        pageSize={allCards.size}
        onPageChange={(page) => setPage(page)}
      />
      {isDeleteModal && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteModal(false)}>
          <ConfirmDeletion
            onConfirm={handleConfirmDeletion}
            onCancel={() => setDeleteModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

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

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getAllCards({ page, sortMethod, nameLike }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPrevLength(allCards?.content?.length);
        setPrevSort(sortMethod || '');
        setPrevName(nameLike || '');
      }
    };

    const delayTimer = setTimeout(() => {
      if (
        !allCards ||
        allCards?.content?.length === 0 ||
        page !== (allCards.pageable?.pageNumber + 1) ||
        prevLength !== allCards?.content?.length ||
        sortMethod !== prevSort ||
        nameLike !== prevName
      ) {
        fetchData();
      }
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
        ) : !allCards.content ? (
          <div className={css.firstLine}>No data available.</div>
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
