import { useState } from "react";
import css from './CreateProduct.module.scss'
import { BsDownload } from 'react-icons/bs';

const DownloadImages = () => {
    const [images, setImages] = useState(new Array(7).fill(null));
    const imageContainers = [1, 2, 3, 4, 5, 6, 7];
    console.log("images", images);
    
    const handleImageDrop = (e, index) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImages = [...images];
                newImages[index] = e.target.result;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleImageClick = (index) => {
        const fileInput = document.getElementById(`fileInput-${index}`);
        fileInput.click();
    };
    
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImages = [...images];
                newImages[index] = e.target.result;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <h3>Product photo</h3>
            <section className={css.firstSection}>
                {imageContainers.map(index => (
                    <div key={index} className={css.imageUploadWindow}>
                        <div
                            className={css.imageUploadArea}
                            onDrop={(e) => handleImageDrop(e, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => handleImageClick(index)}
                        >
                            {images[index] ? (
                                <img src={images[index]} alt="Uploaded" />
                            ) : (
                                <BsDownload />
                            )}
                        </div>
                        <input
                            id={`fileInput-${index}`}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageChange(e, index)}
                        />
                    </div>
                ))}
                
            </section>
            <p>The size of the uploaded image must be under 10Mb (.png, .jpeg), max. 7 image </p>
        </>
    )
}
export default DownloadImages;