import { useEffect, useState } from "react";
import { fetchIndicators } from "../../../../helpers/api";
import css from './Weights.module.scss';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const Weights = () => {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    fetchIndicators('weights')
      .then(setWeights)
      .catch(error => {
        console.log('Error', error);
      })
  }, [])

  const handleEdit = () => {
  }

  const handleDelete = () => {
  }

  console.log(weights);

  return (
    <div className={css.items}>
      <div className={css.firstLine}>
        <p>Weights</p>
      </div>
      <div className={css.columnHeaders}>
        <p>Name</p>
      </div>
      <div>
        {weights?.map(item => {
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

export default Weights;
