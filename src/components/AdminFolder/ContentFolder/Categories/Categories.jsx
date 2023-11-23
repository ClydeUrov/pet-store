import { useEffect, useState } from "react";
import { deleteCategory, fetchIndicators } from "../../../../helpers/api";
import css from './Categories.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Loader from "../../../Loader/Loader";

const Categories = () => {
	const [categories, setCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
	const [editingCategory, setEditingCategory] = useState(null);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndicators('product-categories')
			.then((result) => {
				setCategories(result);
				setLoading(false);
			})
      .catch(error => {
				console.log('Error', error);
				setLoading(false);
			})
  }, [])

  const handleEdit = (item) => {
		setEditingCategory(item);
		setShowCreateForm(true);
	};

  const handleDelete = (itemId) => {
		console.log(`Product ${itemId} deleted`)
		// toast.promise(deleteCategory(itemId), {
		// 	pending: "Deletion in progress",
		// 	error: "Deletion was not complited",
		// })
  }

	const handleCreate = async () => {
    try {
      // const createdCategory = await toast.promise(createCategory({
      //   name: newCategoryName,
      //   image: newCategoryImage,
      // }), {
      //   pending: "Creating category in progress",
      //   error: "Failed to create category",
      // });

			const createdCategory = { name: newCategoryName, image: {filePath: newCategoryImage.name}}

      setCategories(prevCategories => [...prevCategories, createdCategory]);

      setShowCreateForm(false);
      setNewCategoryName("");
      setNewCategoryImage(null);
    } catch (error) {
      console.log('Error', error);
    }
  }

  console.log(categories);

  return (
    <div style={{marginBottom: "40px"}}>
      <div className={css.firstLine}>
        <p>Categories</p>
				<button className={css.topButton} onClick={() => setShowCreateForm(true)}>
					Create
				</button>
      </div>
			{showCreateForm && (
        <div className={css.row} style={{ border: '3px solid #ffad4d', backgroundColor: "#f4f6fa" }}>
					<div>
						<label htmlFor="fileInput" className={css.imageUploadArea}>
							{newCategoryImage || (editingCategory && editingCategory.image) ? (
								<img
									src={
										newCategoryImage
											? URL.createObjectURL(newCategoryImage)
											: editingCategory.image.filePath
									}
									alt="Uploaded"
								/>
							) : (
								<>
									<AiOutlineDownload />
								</>
							)}
						</label>
						<input
							id="fileInput"
							type="file"
							accept="image/*"
							onChange={(e) => setNewCategoryImage(e.target.files[0])}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							placeholder="Category name"
							className={css.search}
							value={newCategoryName || (editingCategory && editingCategory.name) || ''}
							onChange={(e) => setNewCategoryName(e.target.value)}
						/>
					</div>
					<div>
						<AiOutlineCheck onClick={handleCreate} />
						<AiOutlineClose onClick={() => setShowCreateForm(false)} />
					</div>
        </div>
      )}
      <div>
			{loading ? (
        <Loader />
      ) : categories && categories.length > 0 ? (
        categories.map(item => {
          return (
            <div className={css.row}>
							<div>
								<img src={item.image.filePath} alt={item.name} />
								<p>{item.name}</p>
							</div>
							<div>
								<MdOutlineEdit onClick={() => handleEdit(item)} />
								<AiOutlineDelete onClick={() => handleDelete(item.id)} />
							</div>
						</div>
          )
        })
			) : (
				<p>No available items</p>
			)}
      </div>
    </div>
  );
};

export default Categories;
