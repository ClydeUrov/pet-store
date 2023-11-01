import { useRef, useState } from "react";
import css from "./CreateProduct.module.scss";
import { BsDownload } from "react-icons/bs";

const ImageUploader = ({ id, onImageChange }) => {
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

  return (
    <div className={css.imageUploadWindow}>
      <div
        className={css.imageUploadArea}
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleImageClick}
      >
        {image ? <img src={image} alt="Uploaded" /> : <BsDownload />}
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
        <ImageUploader id={mainImage} onImageChange={handleMainImageChange} />
        {Array.from({ length: 6 }, (_, index) => (
          <ImageUploader
            key={index}
            id={`image${index}`}
            onImageChange={(newImage) => handleImageChange(index, newImage)}
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

// const DownloadImages = () => {
//     const [mainImage, setMainImage] = useState(null);
//     const fileInputRef = useRef(null);
//     const [images, setImages] = useState(new Array(6).fill(null));
//     const imageContainers = [1, 2, 3, 4, 5, 6];

//     const handleImageDrop = (e, index) => {
//         e.preventDefault();
//         const file = e.dataTransfer.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const newImages = [...images];
//                 newImages[index] = e.target.result;
//                 setImages(newImages);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleImageClick = (index) => {
//         const fileInput = document.getElementById(`fileInput-${index}`);
//         fileInput.click();
//     };

//     const handleClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleMainImage = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setMainImage(e.target.result);
//             };
//             reader.readAsDataURL(file); // Здесь нужно прочитать файл и получить его содержимое в формате Data URL
//         }
//     };

//     const handleImageChange = (e, index) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const newImages = [...images];
//                 newImages[index] = e.target.result;
//                 setImages(newImages);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <>
//             <h3>Product photo</h3>
//             <section className={css.firstSection}>
//                 <div className={css.imageUploadWindow}>
//                     <div
//                         className={css.imageUploadArea}
//                         onDrop={(e) => handleImageDrop(e)}
//                         onDragOver={(e) => e.preventDefault()}
//                         onClick={() => handleClick()}
//                     >
//                         <p className={css.main}>Main</p>
//                     {mainImage ? (
//                         <img src={mainImage} alt="Uploaded" />
//                     ) : (
//                         <BsDownload />
//                     )}
//                     </div>
//                     <input
//                         ref={fileInputRef}
//                         id="fileInput"
//                         type="file"
//                         accept="image/*"
//                         style={{ display: 'none' }}
//                         onChange={handleMainImage}
//                     />
//                 </div>
//                 {imageContainers.map(index => (
//                     <div key={index} className={css.imageUploadWindow}>
//                         <div
//                             className={css.imageUploadArea}
//                             onDrop={(e) => handleImageDrop(e, index)}
//                             onDragOver={(e) => e.preventDefault()}
//                             onClick={() => handleImageClick(index)}
//                         >
//                             {images[index] ? (
//                                 <img src={images[index]} alt="Uploaded" />
//                             ) : (
//                                 <BsDownload />
//                             )}
//                         </div>
//                         <input
//                             id={`fileInput-${index}`}
//                             type="file"
//                             accept="image/*"
//                             style={{ display: 'none' }}
//                             onChange={(e) => handleImageChange(e, index)}
//                         />
//                     </div>
//                 ))}

//             </section>
//             <p>The size of the uploaded image must be under 10Mb (.png, .jpeg), max. 7 image </p>
//         </>
//     )
// }
// export default DownloadImages;
