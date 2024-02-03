import { useState } from "react";
import css from "./Characteristics.module.scss";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDownload,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useAdminActions } from "../../../../helpers/user.actions";

const CreateUpdate = ({
  title,
  action,
  setField,
  field,
  editingItem,
  setEditingItem,
  characteristics,
  setShowCreateForm,
  setCharacteristics,
}) => {
  const [error, setError] = useState(null);
  const adminActions = useAdminActions();

  const handleCreateOrUpdate = async () => {
    console.log(editingItem);
    try {
      if (editingItem) {
        console.log(field.name);
        await toast.promise(
          adminActions.update(`${action}/${editingItem.id}`, 
          {
            name: field.name,
            ...(field.parent && { parent: field.parent }),
          }),
          {
            pending: "Updating in progress",
            error: "Item was not updated",
            success: "Updated successfully",
          }
        );

        let newItem = {
          name: field.name,
          ...(field.parent && { parent: field.parent }),
        };

        if (field.image && field.image instanceof File) {
          const formData = new FormData();
          formData.append("image", field.image);
          const imageResponse = await adminActions.create(
            `${action}/${editingItem.id}/image`,
            formData
          );
          newItem = { ...newItem, image: imageResponse };
        }
        await setCharacteristics((prevCharacteristics) =>
          prevCharacteristics.map((item) =>
            item.id === editingItem.id ? { ...item, ...newItem } : item
          )
        );
      } else {
        const response = await toast.promise(
          adminActions.create(
            `${action}`,
            { name: field.name, ...(field.parent && { parent: field.parent }) },
          ),
          {
            pending: "Creation in progress",
            error: "Item was not created",
            success: "Created successfully",
          }
        );
        // console.log(response)
        let newItem = { ...response };

        if (field.image) {
          // console.log(field.image)
          const formData = new FormData();
          formData.append("image", field.image);
          const imageResponse = await adminActions.create(
            `${action}/${response.id}/image`,
            formData
          );
          // console.log(imageResponse)
          newItem = { ...newItem, image: imageResponse };
        }
        await setCharacteristics((prevCharacteristics) => [
          ...prevCharacteristics,
          newItem,
        ]);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
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
          {title === "Brands" || title === "Categories" ? (
            <>
              <label htmlFor="fileInput" className={css.imageUploadArea}>
                {field.image ? (
                  <img
                    src={
                      field.image?.filePath || URL.createObjectURL(field.image)
                    }
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
                onChange={(e) =>
                  setField({ ...field, image: e.target.files[0] })
                }
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
              <p style={{ marginBottom: "2px" }}>Category parent</p>
              <select
                value={field.parent?.id || ""}
                onChange={(e) => {
                  const selectedCategory = characteristics.find(
                    (category) => category.id === parseInt(e.target.value, 10)
                  );
                  setField({ ...field, parent: selectedCategory });
                }}
                style={{ borderRadius: "5px" }}
              >
                <option key="init" value="" />
                {characteristics.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id} {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div>
          <AiOutlineCheck onClick={handleCreateOrUpdate} />
          <AiOutlineClose
            onClick={() => {
              setShowCreateForm(false);
              setField({ name: "", parent: null, image: null });
            }}
          />
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
};

export default CreateUpdate;
