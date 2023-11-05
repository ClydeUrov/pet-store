import { useRef, useState } from "react";
import css from "./CreateProduct.module.scss";
import { BsDownload, BsArchive } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const ImageUploader = ({ id, onImageChange, action }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      readAndSetImage(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const readAndSetImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      onImageChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readAndSetImage(file);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setImage(null);
    onImageChange(null);
  };

  return (
    <div className={css.imageUploadWindow}>
      
      <div
        className={css.imageUploadArea}
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleImageClick}
      >
        {action === "main" ? <div className={css.main}>Main</div> : null}
        {image ? <img src={image} alt="Uploaded" /> : <BsDownload />}
        {action === "delete" ? 
          <div className={css.delete} onClick={handleDeleteClick}>
            <AiOutlineDelete />
          </div> : null}
      </div>
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const DownloadImages = () => {
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState(Array(6).fill(null));

  const handleMainImageChange = (newImage) => {
    setMainImage(newImage);
  };

  const handleImageChange = (index, newImage) => {
    const newImages = [...images];
    newImages[index] = newImage;
    setImages(newImages);
  };

  return (
    <>
      <h3>Product photo</h3>
      <section className={css.firstSection}>
        <ImageUploader id={mainImage} onImageChange={handleMainImageChange} action="main" />
        {Array.from({ length: 6 }, (_, index) => (
          <ImageUploader
            key={index}
            id={`image${index}`}
            onImageChange={(newImage) => handleImageChange(index, newImage)}
            action="delete"
          />
        ))}
      </section>
      <p>
        The size of the uploaded image must be under 10Mb (.png, .jpeg), max. 7
        images
      </p>
    </>
  );
};

export default DownloadImages;
