import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Colors.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Colors = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchIndicators('colors')
      .then(setColors)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(colors);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Colors</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {colors?.map(item => {
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

export default Colors;
