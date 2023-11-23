import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Materials.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Materials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchIndicators('materials')
      .then(setMaterials)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(materials);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Materials</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {materials?.map(item => {
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

export default Materials;