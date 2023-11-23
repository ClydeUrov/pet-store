import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Brands.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchIndicators('brands')
      .then(setBrands)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(brands);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Brands</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {brands?.map(item => {
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

export default Brands;
