import { useEffect, useRef, useState } from "react";
import css from "./CreateProduct.module.scss";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import { deleteImageFromCard } from "../../../../helpers/api";

const DownloadImages = ({images, setImages, productId, mainImage, setMainImage}) => {

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleImageDrop = (e, index) => {
    e.preventDefault();
    const newImages = [...images];
    newImages[index] = e.dataTransfer.files[0];
    setImages(newImages);
  };

  const handleDeleteClick = (index) => {
    if(productId && !(images[index] instanceof File)) deleteImageFromCard(productId, images[index].id)
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleMainImage = (e, index) => {
    console.log(e, images[index], index)
    if (images[index] instanceof File) {
      setMainImage({ index, url: URL.createObjectURL(images[index]) });
    } else {
      setMainImage({ id: images[index].id, url: images[index].filePath });
    }
  }

  console.log(images, mainImage);

  return (
    <>
      <h3>Product photo</h3>
      <div className={css.imagesArray}>
        <section >
          <div className={css.imageUploadWindow} >
          <label htmlFor={`fileInput$`} className={css.imageUploadArea} style={{ width: "120px", height: "120px" }}>
              {mainImage ? (
                <img src={mainImage.url} alt="Uploaded" />
              ) : (
                <p style={{textAlign: "center", fontStyle:"italic"}}>Main image is empty</p>
              )}
            </label>
          </div>
        </section>
        {[...Array(6)].map((_, index) => (
        <section key={index}>
          <div
            className={css.imageUploadWindow}
            onDrop={(e) => handleImageDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            {images[index] ? (
              <button onClick={(e) => handleMainImage(e, index)}>Main Image</button>
            ) : null}
            <label htmlFor={`fileInput${index}`} className={css.imageUploadArea}>
              {images[index] ? (
                <img src={
                  images[index].id
                    ? images[index].filePath
                    : URL.createObjectURL(images[index])
                } alt="Uploaded" />
              ) : (
                <>
                  <AiOutlineDownload />
                </>
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
