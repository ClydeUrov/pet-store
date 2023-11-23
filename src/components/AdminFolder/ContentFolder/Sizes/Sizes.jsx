import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Sizes.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Sizes = () => {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    fetchIndicators('product-sizes')
      .then(setSizes)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(sizes);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Size</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {sizes?.map(item => {
          return (
            <div className={css.row}> 
              <p>{item.name}</p> 
              <div>
                <MdOutlineEdit onClick={() => handleEdit(item)} /> 
                <AiOutlineDelete onClick={() => handleDelete(item.id) } />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Sizes;