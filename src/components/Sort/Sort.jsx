import css from "./Sort.module.scss";
//import {useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
//import {handleSort} from '../CardsList/CardsList';
import { useState, useEffect } from "react";

const Sort = ({setSortMethod, setIsOpen, isOpen }) => {
  const [sortName, setSortName] = useState("");

  const listBtn = [
    { id: 0, sort: "price,desc", name: "Price (highest to lowest)" },
    { id: 1, sort: "price,asc", name: "Price (lowest to highest)" },
    { id: 2, sort: "rating,desc", name: "Rating (highest to lowest)" },
    { id: 3, sort: "rating,asc", name: "Rating (lowest to highest)" },
  ];

  const handleSortName = (item) => {
    setSortName(item.name);
    setSortMethod(item.sort);
    setIsOpen(false);
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
        <button type="button" className={css.sort_select} onClick={() => setIsOpen(!isOpen)}>
          {sortName ? `${sortName}` : "Default"}
          <span className={css.sort_icon}>
            <IoIosArrowDown size={20} />
          </span>
        </button>
      ) : (
        <div className={css.sort_box}>
          <button type="button" className={css.sort_select} onClick={() => setIsOpen(!isOpen)}>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
