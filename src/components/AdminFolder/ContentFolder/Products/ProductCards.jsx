import { toast } from "react-toastify";
import Modal from "../../../Modal/Modal";
import ConfirmDeletion from "../../ContentFolder/ConfirmDeletion";
import { useConstants } from "../../../../helpers/routs/ConstantsProvider";
import Pagination from "../../../Pagination/Pagination";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { deleteCard } from "../../../../redux/cards/operations";
import { useState } from "react";
import css from "./Products.module.scss";

const ProductCards = ({
  allCards,
  setPage,
  dispatch,
  setPrevLength,
  setUpdateProduct,
}) => {
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const { constants } = useConstants();

  const handleConfirmDeletion = async () => {
    try {
      await toast.promise(dispatch(deleteCard(deleteItemId)), {
        pending: "Deletion in process",
        error: (error) => {
          if (error.code === 402) {
            return "The product is contained in the cart/wishlist/order and cannot be deleted";
          } else {
            return "The product was not deleted";
          }
        },
      });
      // setPrevLength(allCards.content.length - 1);
    } catch (err) {
      console.error(
        "Error deleting card:",
        err.response?.data?.message || err.message
      );
      alert("An error occurred while deleting the product. Please try again.");
    }
    setDeleteModal(false);
  };

  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
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
              ? `${css.productRow} ${css.notAvailable}`
              : css.productRow
          }
        >
          <div className={css.picture}>
            {item.mainImage && <img src={item.mainImage.filePath} alt="" />}
          </div>
          <div>{item.name}</div>
          <div>{item.category.name}</div>
          <div>
            {constants[1].value} {item.price}
          </div>
          <div>
            {constants[1].value}{" "}
            {item.priceWithDiscount ? item.priceWithDiscount : 0}
          </div>
          <div>{item.brand ? item.brand.name : "No brand"}</div>
          <div>{item.newArrival ? "Yes" : "No"}</div>
          <div>{item.notAvailable ? "Out of stock" : "In stock"}</div>
          <div>
            <p onClick={() => setUpdateProduct(item)}>
              <MdOutlineEdit />
            </p>
            <AiOutlineDelete
              onClick={() => {
                setDeleteItemId(item.id);
                setDeleteModal(true);
              }}
            />
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

export default ProductCards;
