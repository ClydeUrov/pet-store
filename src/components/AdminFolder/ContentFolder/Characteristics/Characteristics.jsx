import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from "./Characteristics.module.scss";
import { AiOutlineDownload, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Loader from "../../../Loader/Loader";
import axiosService from "../../../../helpers/axios";
import DropItems from "./DropItems";

const Characteristics = ({action, title}) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [field, setField] = useState({ name: '', parent: null, image: null })
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setShowCreateForm(false);
    setEditingItem(null);
    if(characteristics) setCharacteristics([]);
    fetchIndicators(action)
      .then((result) => {
        setCharacteristics(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(false);
      });
  }, [action, characteristics]);

  const handleCreateOrUpdate = async () => {
    try {
    const data = {
      name: field.name,
      ...(field.image && { image: { filePath: field.image } }),
      ...(field.parent !== undefined && field.parent !== null && { parent: field.parent }),
    };

    if (editingItem) {
      await axiosService.put(`/${action}/${editingItem.id}`, data);
      setCharacteristics((prevCharacteristics) =>
        prevCharacteristics.map((item) => (item.id === editingItem.id ? { ...item, ...data } : item))
      );
      setEditingItem(null);
    } else {
      console.log(data, action)
      const response = await axiosService.post(`/${action}`, data);
      setCharacteristics((prevCharacteristics) => [...prevCharacteristics, response.data]);
    }

    setShowCreateForm(false);
    setField({ name: "", parent: undefined, image: null });

    } catch (error) {
      setError(`Error: ${error.response.status} ${error.response?.data?.message}` || "An error occurred");
    }
  };

  const handleEdit = (subItem) => {
    setEditingItem(subItem);
  
    setField({
      name: subItem.name || "",
      parent: subItem.parent || null,
      image: subItem.image ? { filePath: subItem.image.filePath } : null,
    });
    setSelectedCategory(subItem.parent?.name || "");
    setShowCreateForm(true);
  };

  const handleDelete = (itemId) => {
    axiosService
      .delete(`/${action}/${itemId}`)
      .then(() => {
        setCharacteristics((prevCharacteristics) =>
          prevCharacteristics.filter((item) => item.id !== itemId)
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div className={css.firstLine}>
        <p>{title}</p>
        <button className={css.topButton} onClick={() => setShowCreateForm(true)} >
          Create
        </button>
      </div>
      {showCreateForm && (
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={css.select}
              >
                <option value='' />
                {characteristics
                  .filter((category) => category.parent === null)
                  .map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
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
      )}
      {error && <p>{error}</p>}
      <div>
        {loading ? (
          <Loader />
        ) : (
          <DropItems characteristics={characteristics} title={title} handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Characteristics;