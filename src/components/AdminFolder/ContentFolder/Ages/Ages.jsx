import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Ages.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Ages = () => {
  const [ages, setAges] = useState([]);

  useEffect(() => {
    fetchIndicators('ages')
      .then(setAges)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(ages);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Ages</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {ages?.map(item => {
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

export default Ages;
