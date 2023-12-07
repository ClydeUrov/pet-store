import css from "./Accordion.module.scss";
import { useState } from "react";
import { CheckboxIcon } from "../../icons/icons";
import { PriceRange } from "./PriceRange";
import { IoIosArrowUp } from "react-icons/io";

export const Accordion = ({ characteristics, setChosenCategory, chosenCategory, selected, setSelected }) => {
  const [openItems, setOpenItems] = useState({});

  const clickHandler = (href) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [href]: !prevOpenItems[href],
    }));
  };

  function handleChange(e, href, id) {
    let isSelected = e.target.checked;
  
    if (isSelected) {
      setSelected((prevData) => {
        const existingItem = prevData.find((item) => item.href === href);
  
        if (existingItem) {
          return prevData.map((item) =>
            item.href === href
              ? { ...item, id: [...new Set([...item.id, id])] }
              : item
          );
        } else {
          return [...prevData, { href, id: [id] }];
        }
      });
    } else {
      setSelected((prevData) =>
        prevData.map((item) => ({
          ...item,
          id: item.id.filter((itemId) => itemId !== id),
        }))
      );
    }
  }

  const flagList = [
    { title: "Age", href: "ageId", content: characteristics.age },
    { title: "Breed size", href: "sizeId", content: characteristics.size },
    { title: "Brand", href: "brandId", content: characteristics.brand },
    { title: "Color", href: "colorId", content: characteristics.color },
    { title: "Material", href: "materialId", content: characteristics.material },
    { title: "Package weight", href: "weightId", content: characteristics.weight },
    { title: "Prescription", href: "prescriptionId", content: characteristics.prescription },
  ];

  return (
    <>
      <ul className={css.list}>
        {characteristics.category
          .filter((item) =>
            chosenCategory
              ? item.parent?.id === chosenCategory.id
              : item.parent === null
          )
          .map((item) => (
            <li
              key={item.id}
              className={css.link_item}
              onClick={() => setChosenCategory(item)}
            >
              {item.name}
            </li>
          ))}
      </ul>

      <p className={css.filters_title}>Narrow by</p>

      <ul className={css.accordion}>
        <li className={css.accordion_item}>
          <button
            type="button"
            className={`${css.accordion_title} ${css.open}`}
          >
            Price{" "}
            <span className={css.accordion_price_icon}>
              <IoIosArrowUp size={16} />
            </span>
          </button>
          <div className={css.accordion_item_price}>
            <PriceRange />
          </div>
        </li>

        {flagList.map(({ title, href, content }) => {
          if (!content) {
            return null;
          }

          const isOpen = openItems[href];
          return (
            <li key={title} className={css.accordion_item}>
              <button
                className={`${css.accordion_title} ${isOpen ? `${css.open}` : ""}`}
                onClick={() => clickHandler(href)}
              >
                {title}
                <span
                  className={`${css.accordion_icon} ${isOpen ? `${css.open_icon}` : ""}`}
                >
                  <IoIosArrowUp size={16} />
                </span>
              </button>

              {isOpen && (
                <ul className={css.accordion_list} style={{height:"auto", marginLeft: "20px"}}>
                {content.map((item) => {
                  const isChecked = selected.some((select) => select.href === href && select.id.includes(item.id));
                  const checkboxId = `${href}-${item.id}`;

                  return (
                    <li key={checkboxId}>
                      <label className={css.checkbox_item} htmlFor={checkboxId}>
                        <input
                          id={checkboxId}
                          type="checkbox"
                          className={css.checkbox__field}
                          checked={isChecked}
                          onChange={(e) => handleChange(e, href, item.id)}
                        />
                        <div
                          className={`${css.checkbox__icon_true} ${
                            isChecked ? "" : `${css.checkbox__icon_false}`
                          }`}
                        >
                          <CheckboxIcon />
                        </div>
                        <span className={css.checkbox_title}>{item.name}</span>
                      </label>
                    </li>
                  );
                })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
