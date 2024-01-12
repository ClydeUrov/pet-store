import React, { useState } from 'react'
import Pagination from '../../Pagination/Pagination';
import css from './Users.module.scss';
import Modal from '../../Modal/Modal';
import { LiaUserCheckSolid, LiaUserTimesSolid } from "react-icons/lia";
import { useAdminActions } from '../../../helpers/user.actions';

const ChangeStatus = ({ onConfirm, status }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <> 
      <p className={css.logout__text}>Are you sure you want to change {status} status?</p>
      <button
        type="submit"
        className={css.logout__button}
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </>
  );
}

const UserTable = ({ allUsers, setPage, adminAction }) => {
  const [isModal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const handleStatus = async () => {
    await adminAction
      .updateStatus(
        `users/${selected.email}/status?status=${selected.status === "ACTIVE" ? "BLOCKED" : "ACTIVE"}`
      )
      .catch((e) => {
        e.response ? setError(e.response.data.message) : setError(e.message)
      })

    closeModal();
  };

  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setError('');
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
          className={css.productRow}
          style={{
            backgroundColor:
              item.status === "BLOCKED" ? "#D0D0D0"
                : item.role === "ADMIN" ? "#edddff"
                : "#def6df",
          }}
        >
          <div>{item.firstName}</div>
          <div>{item.lastName}</div>
          <div>{item.email}</div>
          <div>{item.address ? item.address : "No Address"}</div>
          <div>{item.status}</div>
          <div>{item.createdAt ? item.createdAt : "No data"}</div>
          <div>
            {item.status === "ACTIVE" ? 
              <LiaUserCheckSolid onClick={() => {
                setModal(true);
                setSelected({ status: item.status, email: item.email });
              }} /> :
              <LiaUserTimesSolid onClick={() => {
                setModal(true);
                setSelected({ status: item.status, email: item.email });
              }} />
            }
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
      {isModal && (
        <Modal title="Confirm Status Change" onClose={closeModal}>
          <ChangeStatus
            onConfirm={handleStatus}
            status={selected.status}
          />
        </Modal>
      )}
    </div>
  );
}

export default UserTable