import css from "./Accordion.module.scss";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckboxIcon } from "../../icons/icons";
import { PriceRange } from "./PriceRange";
import {
  fetchMainCategories,
  fetchInnerCategoriesFromMainCategory,
} from "../../helpers/api";
import { makeInnerLinkName } from "../../helpers/functions";
import { IoIosArrowUp } from "react-icons/io";

export const Accordion = ({
  weights,
  ages,
  brands,
  colors,
  materials,
  prescriptions,
  productSizes,
}) => {
  let { pathname } = useLocation();
  let categoryWithId = pathname.split("/");
  let categoryId = categoryWithId[2].split("-")[1];

  const [openId, setOpenId] = useState(null);

  const clickHandler = (i) => {
    if (i === openId) {
      setOpenId(null);
      return;
    }
    setOpenId(i);
    return;
  };

  const [selected, setSelected] = useState([]);

  function handleChange(e) {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelected([...selected, value]);
    } else {
      setSelected((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }


  const flagList = [
    { title: "Age", href: "ages", content: ages },
    { title: "Breed size", href: "productSizes", content: productSizes },
    { title: "Brand", href: "brands", content: brands },
    { title: "Material", href: "materials", content: materials },
    { title: "Package weight", href: "weights", content: weights },
    { title: "Prescription", href: "prescriptions", content: prescriptions },
  ];


  const [innerCategories, setInnerCategories] = useState([]);

  useEffect(() => {
    if (!categoryId) {
      fetchMainCategories()
        .then(setInnerCategories)
        .catch((error) => {
          toast.error(
            `Oops, something went wrong! Reload the page or try again later!`
          );
          console.log("Error", error);
        });
      return;
    }
    fetchInnerCategoriesFromMainCategory(categoryId)
      .then(setInnerCategories)
      .catch((error) => {
        toast.error(
          `Oops, something went wrong! Reload the page or try again later!`
        );
        console.log("Error", error);
      });
  }, [categoryId]);

  return (
    <>
      <ul className={css.list}>
        {innerCategories.map((item) => {
          return (
            <li key={item.id} className={css.link_item}>
              <NavLink
                to={makeInnerLinkName(item)}
                className={css.link_item_title}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
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
          return (
            <li key={title} className={css.accordion_item}>
              <button
                className={`${css.accordion_title} ${title === openId ? `${css.open}` : ""
                  }`}
                onClick={() => clickHandler(title)}
              >
                {title}
                <span
                  className={`${css.accordion_icon} ${title === openId ? `${css.open_icon}` : ""
                    }`}
                >
                  <IoIosArrowUp size={16} />
                </span>
              </button>
              <ul
                className={`${css.accordion_list} ${title === openId ? `${css.open}` : ""
                  }`}
              >
                {content.map((item) => {
                  return (
                    <li key={item.id}>
                      <label className={css.checkbox_item} htmlFor={`${href}-${item.id}`}>
                        <input
                          id={`${href}-${item.id}`}

                          type="checkbox"
                          className={css.checkbox__field}
                          checked={selected.includes(`${href}-${item.id}`)}
                          value={`${href}-${item.id}`}
                          onChange={handleChange}
                        />
                        <div
                          className={`${css.checkbox__icon_true} ${selected.includes(`${href}-${item.id}`)
                            ? ""
                            : `${css.checkbox__icon_false}`
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
            </li>
          );
        })}
      </ul>
    </>
  );
};
