import { useState } from "react";
import { useConstants } from "../../../helpers/routs/ConstantsProvider";
import Modal from "../../Modal/Modal";
import Pagination from "../../Pagination/Pagination";
import ConfirmDeletion from "../ContentFolder/ConfirmDeletion";
import css from "./Orders.module.scss";
import { FaAngleRight, FaArrowDownLong } from "react-icons/fa6";

const OrderCards = ({allOrders, setPage}) => {
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const { constants } = useConstants();

  // const handleConfirmDeletion = async () => {
  //   try {
  //     await toast.promise(dispatch(deleteCard(deleteItemId)), {
  //       pending: "Deletion in process",
  //       error: (error) => {
  //         if (error.code === 402) {
  //           return "The product is contained in the cart/wishlist/order and cannot be deleted";
  //         } else {
  //           return "The product was not deleted";
  //         }
  //       },
  //     });
  //     // setPrevLength(allCards.content.length - 1);
  //   } catch (err) {
  //     console.error(
  //       "Error deleting card:",
  //       err.response?.data?.message || err.message
  //     );
  //     alert("An error occurred while deleting the product. Please try again.");
  //   }
  //   setDeleteModal(false);
  // };

  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      <div className={css.columnHeaders}>
        <p></p>
        <p>Status</p>
        <p>Customer</p>
        <p>Created at <FaArrowDownLong /></p>
        <p>Sum</p>
        <p>Phone number</p>
        <p>Comment</p>
      </div>
      {allOrders.content.map((item) => (
        <div
          key={item.id}
          className={
            item.notAvailable
              ? `${css.productRow} ${css.notAvailable}`
              : css.productRow
          }
        >
          <div><FaAngleRight /></div>
          <div>{item.status}</div>
          <div>{item.customer}</div>
          <div>{item.createdAt}</div>
          <div>{item.sum}</div>
          <div>{item.phoneNumber}</div>
          <div>{item.comment}</div>
        </div>
      ))}
      <Pagination
        className="pagination-bar"
        currentPage={allOrders.number + 1}
        totalCount={allOrders.totalElements}
        pageSize={allOrders.size}
        onPageChange={(page) => setPage(page)}
      />
      {isDeleteModal && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteModal(false)}>
          <ConfirmDeletion
            // onConfirm={handleConfirmDeletion}
            onCancel={() => setDeleteModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default OrderCards;