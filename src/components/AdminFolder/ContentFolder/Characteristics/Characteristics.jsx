import { useEffect, useState } from "react";
import css from "./Characteristics.module.scss";
import Loader from "../../../Loader/Loader";
import axiosService from "../../../../helpers/axios";
import DropItems from "./DropItems";
import { toast } from "react-toastify";
import CreateUpdate from "./CreateUpdateChar";
import Modal from "../../../Modal/Modal";
import ConfirmDeletion from "../ConfirmDeletion";
import { useAdminActions } from "../../../../helpers/user.actions";

const Characteristics = ({action, title}) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [field, setField] = useState({ name: '', parent: null, image: null })
  const [loading, setLoading] = useState(true);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const adminActions = useAdminActions();

  useEffect(() => {
    if(showCreateForm) setShowCreateForm(false);
    if(editingItem) setEditingItem(null);
    if(characteristics) {setLoading(true); setCharacteristics([])};
    axiosService
      .get(`/${action}`)
      .then((result) => {
        setCharacteristics(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        if (err.response?.data.message) {
            const errorResponse = JSON.parse(err.response.data.message);
            setError(errorResponse);
        }
      })
  }, [action]);

  const handleEdit = (subItem) => {
    setEditingItem(subItem);
  
    setField({
      name: subItem.name || "",
      parent: subItem.parent || null,
      image: subItem.image ? { filePath: subItem.image.filePath } : null,
    });

    setShowCreateForm(true);
  };

  const handleConfirmDeletion = () => {
    toast.promise(
      adminActions
        .deleteAction(`${action}/${deleteItemId}`)
        .then(() => {
          setCharacteristics((prevCharacteristics) =>
            prevCharacteristics.filter((item) => item.id !== deleteItemId)
          );
        })
        .catch((err) => {
          console.log("Error", err);
          if (err.response?.data.message) {
              const errorResponse = JSON.parse(err.response.data.message);
              setError(errorResponse);
          }
        }),
    {
      pending: "Deletion in progress",
      error: "Item was not deleted",
      success: "Deleted successfully",
    });
    setDeleteModal(false);
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div className={css.firstLine}>
        <p>{title}</p>
        <button className={css.topButton} onClick={() => {
          setShowCreateForm(true); 
          setField({});
          setEditingItem(null);
        }} >
          Create
        </button>
      </div>
      {showCreateForm && (
        <CreateUpdate
          adminActions={adminActions}
          title={title}
          action={action}
          setField={setField}
          field={field}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
          setShowCreateForm={setShowCreateForm} 
        />
      )}

      {loading ? (
        <Loader />
      ) : characteristics?.length === 0 ? (
        <p>No available items</p>
      ) : (
        <>
          <DropItems 
            title={title}
            characteristics={characteristics}
            handleEdit={handleEdit}
            setDeleteItemId={setDeleteItemId}
            setDeleteModal={setDeleteModal}
          />
        </>
      )}

      {error && <p>{error}</p>}
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

export default Characteristics;