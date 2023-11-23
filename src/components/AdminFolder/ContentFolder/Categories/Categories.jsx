import { useEffect, useState } from "react";
import { deleteCategory, fetchIndicators } from "../../../../helpers/api";
import css from './Categories.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    toast.promise(fetchIndicators('product-categories'), {
			pending: "Loading items",
			error: "The items was not loaded",
		})
      .then(setCategories)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = (itemId) => {
		toast.promise(deleteCategory(itemId), {
			pending: "Deletion in progress",
			error: "Deletion was not complited",
		})
  }

  console.log(categories);

  return (
    <div style={{marginBottom: "40px"}}>
      <div className={css.firstLine}>
        <p>Categories</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {categories?.map(item => {
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
        })}
      </div>
    </div>
  );
};

export default Categories;
