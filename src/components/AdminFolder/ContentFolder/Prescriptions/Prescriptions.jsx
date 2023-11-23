import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Prescriptions.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchIndicators('prescriptions')
      .then(setPrescriptions)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(prescriptions);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Prescriptions</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {prescriptions?.map(item => {
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

export default Prescriptions;
