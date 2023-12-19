import css from "./CreateUpdateProduct.module.scss";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../../../../Modal/Modal";
import ConfirmDeletion from "../../ConfirmDeletion";
import { useAdminActions } from "../../../../../helpers/user.actions";

const DownloadImages = ({images, setImages, productId, mainImage, setMainImage}) => {
  const [error, setError] = useState(null);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const adminAction = useAdminActions();

  const handleImageChangeOrDrop = async (e, index) => {
    e.preventDefault();
  
    const file = e.target.files[0] || e.dataTransfer.files[0];

    if (file) {
      if (file.size > 10485760) {
        setError("Image size exceeds 10 MB limit");
        return;
      }

      const formData = new FormData();
      formData.append("images", file);
  
      try {
        const image = await toast.promise(
          adminAction.create(`products/${productId}/images`, formData), 
          {
            pending: "Image loading in progress",
            error: "Image was not loaded"
          }
        );

        const newImages = [...images];
        console.log("image", newImages, image);
        newImages[index] = image[0];
        setImages(newImages);
      } catch (err) {
        err.response ? setError(err.response.data.message) : setError(err.message)
      }
    }
  };

  const handleConfirmDeletion = () => {
    if(productId) {
      adminAction
        .delete(`/products/${productId}/images/${images[deleteItemId].id}`)
        .catch((err) => {err.response ? setError(err.response.data.message) : setError(err.message)})
    }
    const newImages = [...images];
    newImages.splice(deleteItemId, 1);
    setImages(newImages);
    setDeleteModal(false);
  };

  const handleMainImage = (index) => {
    setMainImage({ id: images[index].id, url: images[index].filePath });
  }


  return (
    <>
      <h3>Product photo</h3>
      <div className={css.imagesArray}>
        <section >
          <label htmlFor={`fileInput$`} className={css.imageUploadArea} style={{ width: "120px", height: "120px" }}>
            {mainImage ? (
              <img src={mainImage.url} alt="Uploaded" />
            ) : (
              <p style={{textAlign: "center", fontStyle:"italic"}}>Main image is empty</p>
            )}
          </label>
        </section>
        {[...Array(6)].map((_, index) => (
        <section key={index}>
          <div
            className={css.imageUploadWindow}
            onDrop={(e) => handleImageChangeOrDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            {images[index] ? (
              
              <button
                className={`${css.mainImageButton} ${mainImage?.id === images[index].id ? css.activeImg : ""}`}
                onClick={(e) => handleMainImage(index)}
              >
                Main Image
              </button>
            ) : null}
            <label htmlFor={`fileInput${index}`} className={css.imageUploadArea}>
              {images[index] ? (
                <img src={
                  images[index].id
                    ? images[index].filePath
                    : URL.createObjectURL(images[index])
                } alt="Uploaded" />
              ) : (
                <AiOutlineDownload />
              )}
              
            </label>
            <input
              id={`fileInput${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChangeOrDrop(e, index)}
              style={{ display: "none" }}
            />
            {images[index] ? (
            <div className={css.delete} onClick={() => {setDeleteItemId(index); setDeleteModal(true);}}>
              <AiOutlineDelete />
            </div>
            ) : null }
          </div>
        </section>
        ))}
      </div>
      <p>The size of the uploaded image must be under 10Mb (.png, .jpeg)</p>
      {error && <p>{error}</p>}
      {isDeleteModal && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteModal(false)}>
          <ConfirmDeletion
            onConfirm={handleConfirmDeletion}
            onCancel={() => setDeleteModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default DownloadImages;
