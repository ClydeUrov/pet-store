import React, { useState } from 'react'
import css from "./Characteristics.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

const DropItems = ({characteristics, title, handleEdit, handleDelete}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item.id === selectedItem?.id ? null : item);
  };

  console.log("asdfasas", characteristics);
  
  const renderSubItems = (parentItem) => {
    return characteristics
      .filter((item) => item.parent?.id === parentItem.id)
      .map((subItem) => (
        <div key={subItem.id} className={css.row} style={{marginLeft: "38px"}}>
          <div>
            {(title === "Brands" || title === "Categories") ? (
              <img src={subItem.image?.filePath} alt={subItem.name} />
            ) : null}
            <p>{subItem.name}</p>
          </div>
          <div>
            <MdOutlineEdit onClick={() => handleEdit(subItem)} />
            <AiOutlineDelete onClick={() => handleDelete(subItem.id)} />
          </div>
        </div>
      ));
  };

  const renderItems = (items) => {
    console.log(title, items, characteristics)
    return items.map((item) => (
      title === "Categories" ? (
        <div key={item.id} className={css.firstRow}>
          <div className={css.row} onClick={() => handleItemClick(item)} style={{margin:"0"}}>
            <div>
              {(title === "Brands" || title === "Categories") ? (
                <img src={item.image?.filePath} alt={item.name} />
              ) : null}
              <p>{item.name}</p>
              <BsChevronDown style={{ marginLeft: "30px" }} />
            </div>
            <div>
              <MdOutlineEdit onClick={() => handleEdit(item)} />
              <AiOutlineDelete onClick={() => handleDelete(item.id)} />
            </div>
          </div>
          {selectedItem && selectedItem.id === item.id && renderSubItems(item)}
        </div>
      ) : (
        <div key={item.id} className={css.row} style={{border: "1px solid #a3a3a3"}}>
          <div>
            {(title === "Brands" || title === "Categories") ? (
              <img src={item.image?.filePath} alt={item.name} />
            ) : null}
            <p>{item.name}</p>
          </div>
          <div>
            <MdOutlineEdit onClick={() => handleEdit(item)} />
            <AiOutlineDelete onClick={() => handleDelete(item.id)} />
          </div>
        </div>
      )
    ));
  };

  return (
    <>
      {title === "Categories" 
        ? renderItems(characteristics.filter((item) => item.parent === null))
        : renderItems(characteristics)
      }
    </>
  );
}

export default DropItems;