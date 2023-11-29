import css from "./CreateUpdateProduct.module.scss";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import { addImagesToCard, deleteImageFromCard } from "../../../../../helpers/api";

const DownloadImages = ({images, setImages, productId, mainImage, setMainImage}) => {

  const handleImageChange = async (e, index) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    const image = await addImagesToCard(productId, formData);

    const newImages = [...images];
    newImages[index] = image[0];
    setImages(newImages);
  };

  const handleImageDrop = async (e, index) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("images", e.dataTransfer.files[0]);
    const image = await addImagesToCard(productId, formData);

    const newImages = [...images];
    newImages[index] = image[0];
    setImages(newImages);
  };

  const handleDeleteClick = (index) => {
    if(productId && !(images[index] instanceof File)) deleteImageFromCard(productId, images[index].id)
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleMainImage = (index) => {
    console.log(images, index);
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
            onDrop={(e) => handleImageDrop(e, index)}
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
              onChange={(e) => handleImageChange(e, index)}
              style={{ display: "none" }}
            />
            {images[index] ? (
            <div className={css.delete} onClick={() => handleDeleteClick(index)}>
              <AiOutlineDelete />
            </div>
            ) : null }
          </div>
        </section>
        ))}
      </div>
      <p>The size of the uploaded image must be under 10Mb (.png, .jpeg)</p>
    </>
  );
};

export default DownloadImages;
