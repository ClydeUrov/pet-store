import css from "./Sort.module.scss";
//import {useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
//import {handleSort} from '../CardsList/CardsList';
import { useState, useEffect } from "react";

export const Sort = ({ onClose, isOpen }) => {
  const [sortName, setSortName] = useState("");



  const listBtn = [
    { id: 0, sort: "price_desc", name: "Price (highest to lowest)" },
    { id: 1, sort: "price_asc", name: "Price (lowest to highest)" },
    { id: 2, sort: "rating_desc", name: "Rating (highest to lowest)" },
    { id: 3, sort: "rating_asc", name: "Rating (lowest to highest)" },
  ];



  const handleSortName = (item) => {
    // handleSort(item.sort)
    onClose();
    setSortName(item.name);
    return;
  };

  const handleSelectedSortName = (name) => {
    if (sortName === name) {
      return (
        <>
          <span>{name}</span>
          <span>
            <AiOutlineCheck size={20} className={css.check_icon} />
          </span>
        </>
      );
    }
    return name;
  };

  return (
    <div className={css.sort}>
      <p className={css.sort_label}>Sort by</p>

      {!isOpen ? (
        <button type="button" className={css.sort_select} onClick={onClose}>
          {sortName ? `${sortName}` : "Default"}
          <span className={css.sort_icon}>
            <IoIosArrowDown size={20} />
          </span>
        </button>
      ) : (
        <div className={css.sort_box}>
          <button type="button" className={css.sort_select} onClick={onClose}>
            Default{" "}
            <span className={css.sort_icon}>
              <IoIosArrowDown size={20} />
            </span>
          </button>
          <ul className={css.sort_list}>
            {listBtn.map((item) => (
              <li key={item.id} className={css.sort_option}>
                <button
                  type="button"
                  className={css.sort_btn}
                  onClick={() => handleSortName(item)}
                >
                  {handleSelectedSortName(item.name)}
                </button>
                {/* <button type='button' className={css.sort_btn} onClick={handleSortName} id={item.sort}>{item.name}</button> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
