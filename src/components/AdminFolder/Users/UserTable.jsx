import React, { useState } from 'react'
import Pagination from '../../Pagination/Pagination';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import css from './Users.module.scss';
import Modal from '../../Modal/Modal';
import ConfirmDeletion from '../ContentFolder/ConfirmDeletion';

const UserTable = ({
  allUsers, 
  setPage,
  dispatch,
  setEditProduct,
  setPrevLength
}) => {

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleConfirmDeletion = async () => {
    // try {
    //   await toast.promise(dispatch(deleteCard(deleteItemId)), {
    //     pending: "Promise is pending",
    //     error: "The product was not deleted",
    //   });
    //   setPrevLength(allCards.content.length - 1);
    //   setDeleteModal(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      <div className={css.columnHeaders}>
        <p>Surname</p>
        <p>Name</p>
        <p>E-mail</p>
        <p>Address</p>
        <p>Status</p>
        <p>Created on</p>
        <p></p>
      </div>
      {allUsers.content.map((item) => (
        <div
          key={item.id}
          className={
            item.status === "ACTIVE"
              ? css.productRow
              : `${css.productRow} ${css.notAvailable}`
          }
        >
          <div>{item.firstName}</div>
          <div>{item.lastName}</div>
          <div>{item.email}</div>
          <div>{item.address ? item.address : "No Address"}</div>
          <div>{item.status}</div>
          <div>{item.createdAt ? item.createdAt : "No data"}</div>
          <div>
            <MdOutlineEdit onClick={() => setEditProduct(item)} />
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
        currentPage={allUsers.number + 1}
        totalCount={allUsers.totalElements}
        pageSize={allUsers.size}
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
}

export default UserTable