import React, { useState } from 'react'
import css from "./Characteristics.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

const DropItems = ({characteristics, title, handleEdit, setDeleteItemId, setDeleteModal}) => {
  const [openItems, setOpenItems] = useState({});

  const handleItemClick = (itemId) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemId]: !prevOpenItems[itemId],
    }));
  };

  const renderSubItems = (parentItem) => {
    return characteristics
      .filter((item) => item.parent?.id === parentItem.id)
      .map((subItem) => (
        <div key={subItem.id} style={{ marginLeft: "38px" }}>
          <div className={css.row} onClick={() => handleItemClick(subItem.id)}>
            <div >
              {(title === "Brands" || title === "Categories") ? (
                <img src={subItem.image?.filePath ? subItem.image?.filePath : subItem.image} alt={subItem.name} />
              ) : null}
              <p>{subItem.name}</p>
              <BsChevronDown style={{ marginLeft: "30px" }} />
            </div>
            <div>
              <MdOutlineEdit onClick={() => handleEdit(subItem)} />
              <AiOutlineDelete onClick={() => {setDeleteItemId(subItem.id); setDeleteModal(true)}} />
            </div>
          </div>
          {openItems[subItem.id] && renderSubItems(subItem)}
        </div>
      ));
  };

  const renderItems = (items) => {
    return items.map((item) => (
      title === "Categories" ? (
        <div key={item.id} className={css.firstRow}>
          <div className={css.row} onClick={() => handleItemClick(item.id)} style={{ margin: "0" }}>
            <div>
              {(title === "Brands" || title === "Categories") ? (
                <img src={item.image?.filePath} alt={item.name} />
              ) : null}
              <p>{item.name}</p>
              <BsChevronDown style={{ marginLeft: "30px" }} />
            </div>
            <div>
              <MdOutlineEdit onClick={() => handleEdit(item)} />
              <AiOutlineDelete onClick={() => {setDeleteItemId(item.id); setDeleteModal(true)}} />
            </div>
          </div>
          {openItems[item.id] && renderSubItems(item)}
        </div>
      ) : (
        <div key={item.id} className={css.row} style={{ border: "1px solid #a3a3a3" }}>
          <div>
            {(title === "Brands" || title === "Categories") ? (
              <img src={item.image?.filePath} alt={item.name} />
            ) : null}
            <p>{item.name}</p>
          </div>
          <div>
            <MdOutlineEdit onClick={() => handleEdit(item)} />
            <AiOutlineDelete onClick={() => {setDeleteItemId(item.id); setDeleteModal(true)}} />
          </div>
        </div>
      )
    ));
  };

  return (
    <>
      {title === "Categories" 
        ? renderItems(characteristics?.filter((item) => item.parent === null))
        : renderItems(characteristics)
      }
    </>
  );
}

export default DropItems;