import { useEffect, useState } from "react";
import axiosService from "../../../../helpers/axios";
import Loader from "../../../Loader/Loader";
import css from "./Constants.module.scss";
import { AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import Modal from "../../../Modal/Modal";
import ConfirmDeletion from "../ConfirmDeletion";
import { toast } from "react-toastify";
import { useAdminActions } from "../../../../helpers/user.actions";
import { useConstants } from "../../../../helpers/routs/ConstantsProvider";

const Constants = () => {
  const { constants, updateConstants } = useConstants();

  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState(null);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const adminActions = useAdminActions();

  useEffect(() => {
    setLoading(true);
    axiosService.get(`/constants`)
      .then((resp) => {
        setLoading(false);
        updateConstants(resp.data);
        setCurrency(resp.data[1].value);
      })
      .catch((err) => 
        err.response ? setError(err.response.data.message) : setError(err.message)
      );
  }, []);

  const updateItem = ({ key, data }) => {
    const formData = new FormData();
    formData.append("value", data);

    const updatePromise = key === 'LOGO'
      ? adminActions.update(`constants/${key}`, formData)
        .then((resp) => {
          updateConstants([
            {
              key: key,
              value: {
                id: resp.id,
                filePath: resp.filePath,
                fileName: resp.fileName,
              },
            },
            constants[1],
          ]);
        })
      : adminActions
        .update(`constants/${key}`, formData)
        .then(() => updateConstants([
          constants[0],
          {key: key, value: data}
        ]))

    toast.promise(updatePromise, {
      success: "Updated successfully",
      pending: key === 'LOGO' ? "Image loading in progress" : "Currency placement in progress",
      error: "Operation failed",
    });
  };

  const handleConfirmDeletion = () => {
    if (constants[0].key === "LOGO") {
      adminActions.deleteAction(`constants/${constants[0].key}/image`)
        .then(() => {
          updateConstants([
            { key: constants[0].key, value: {} },
            constants[1],
          ]);
        })
        .catch((error) => setError(error.message));
    }
    setDeleteModal(false);
  };

  return (
    <section>
      <div className={css.firstLine}>
        <p>Settings</p>
      </div>
        {loading ? (
          <Loader />
        ) : constants && constants.length > 0 ? (
          <div className={css.content}>
            <h3>Logo image</h3>
            <div
              onDrop={(e) => {
                e.preventDefault();
                updateItem({ key: "LOGO", data: e.dataTransfer.files[0] });
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <label htmlFor="fileInput" className={css.imageUploadArea}>
                {constants[0].value?.filePath ? (
                  <img src={constants[0].value.filePath} alt={constants[0].key} />
                ) : (
                  <AiOutlineDownload />
                )}
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => updateItem({key: constants[0].key, data: e.target.files[0] })}
                style={{ display: "none" }}
              />
              {constants[0].value && (
                <div className={css.delete} onClick={() => {setDeleteModal(true);}}>
                  <AiOutlineDelete />
                </div>
              )}
            </div>
              
            <h3>Currency</h3>
            <div className={css.input}>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)} 
              />
              <button onClick={() => {updateItem({ key: constants[1].key, data: currency })}}>Ok</button>
            </div>
          </div>
        ) : (
          <p>No available items</p>
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
    </section>
  )
}

export default Constants;