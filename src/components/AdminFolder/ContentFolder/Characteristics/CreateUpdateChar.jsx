import { useState } from "react";
import css from "./Characteristics.module.scss";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDownload } from "react-icons/ai";
import axiosService from "../../../../helpers/axios";
import { toast } from "react-toastify";

const CreateUpdate = ({
  title, action, setField, field, editingItem, setEditingItem, characteristics, setShowCreateForm, setCharacteristics
}) => {
  const [error, setError] = useState(null);

  const handleCreateOrUpdate = async () => {
    try {
      if (editingItem) {
        console.log(field.name)
        await toast.promise(axiosService.put(
          `/${action}/${editingItem.id}`, 
          {name: field.name, ...(field.parent && { parent: field.parent })}
        ), {
          pending: "Updating in progress",
          error: "Item was not updated",
          success: "Updated successfully",
        })

        let newItem = {
          name: field.name,
          ...(field.parent && { parent: field.parent }),
        };
  
        if (field.image && field.image instanceof File) {
          const formData = new FormData();
          formData.append("image", field.image);
          const imageResponse = await axiosService.post(`/${action}/${editingItem.id}/image`, formData);
          newItem = { ...newItem, image: imageResponse.data };
        }
        await setCharacteristics((prevCharacteristics) =>
          prevCharacteristics.map((item) =>
            item.id === editingItem.id ? { ...item, ...newItem } : item
          )
        );
      } else {
        const response = await toast.promise(axiosService.post(
          `/${action}`, 
          {name: field.name, ...(field.parent && { parent: field.parent })}
        ), {
          pending: "Creation in progress",
          error: "Item was not created",
          success: "Created successfully",
        });
        let newItem = { ...response.data };
  
        if (field.image) {
          const formData = new FormData();
          formData.append("image", field.image);
          const imageResponse = await axiosService.post(`/${action}/${response.data.id}/image`, formData);
          newItem = { ...newItem, image: imageResponse.data };
        }
        await setCharacteristics((prevCharacteristics) => [...prevCharacteristics, newItem]);
      }
    } catch (err) {
      if (err.response?.data.message) {
        const errorResponse = JSON.parse(err.response.data.message);
        setError(errorResponse);
      } if (err.message) {
        const errorResponse = JSON.parse(err.message);
        setError(errorResponse);
      }
    }
    setField({});
    setEditingItem(null);
  };

  return (
    <>
      <div
        className={css.row}
        style={{ border: "3px solid #ffad4d", backgroundColor: "#f4f6fa" }}
      >
        <div>
          {(title === "Brands" || title === "Categories") ? (
            <>
            <label htmlFor="fileInput" className={css.imageUploadArea}>
              {field.image ? (
                <img
                  src={field.image?.filePath || URL.createObjectURL(field.image)}
                  alt="Uploaded"
                />
              ) : (
                <AiOutlineDownload />
              )}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => setField({ ...field, image: e.target.files[0] })}
              style={{ display: "none" }}
            />
            </>
          ) : null}
          <input
            type="text"
            placeholder="Name"
            value={field.name || ""}
            onChange={(e) => setField({ ...field, name: e.target.value })}
          />
          {title === "Categories" && (
          <div>
            <p style={{marginBottom: "2px"}}>Category parent</p>
            <select
              value={field.parent?.id || ''}
              onChange={(e) => {
                const selectedCategory = characteristics.find(
                  category => category.id === parseInt(e.target.value, 10)
                );
                setField({ ...field, parent: selectedCategory });
              }}
              style={{borderRadius:"5px"}}
            >
              <option value='' />
              {characteristics.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.id}{' '}{category.name}
                </option>
              ))}
            </select>
          </div>
          )}
        </div>
        <div>
          <AiOutlineCheck onClick={handleCreateOrUpdate} />
          <AiOutlineClose onClick={() => {
            setShowCreateForm(false);
            setField({ name: '', parent: null, image: null });
          }} />
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}

export default CreateUpdate