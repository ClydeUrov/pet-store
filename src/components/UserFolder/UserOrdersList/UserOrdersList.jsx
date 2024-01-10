import css from "./UserOrdersList.module.scss";
import { Link } from "react-router-dom";

const UserOrdersList = ({ elements }) => {
  function markupImgItem(items) {
    return (
      <>
        {items.map((item) => (
          <div className={css.img_cover} key={item.name}>
            {item.picture ? (
              <img src={item.picture} className={css.img} alt={item.name} />
            ) : null}
          </div>
        ))}
      </>
    );
  }

  const markupListOfImg = (items) => {
    if (items.length > 3) {
      let newArr = items.slice(0, 3);
      return markupImgItem(newArr);
    }
    return markupImgItem(items);
  };

  const markupExtraImgItem = (items) => {
    if (items.length > 3) {
      const numberOfExtraImg = items.length - 3;

      return (
        <div className={css.img_cover}>
          <p className={css.img_text}>+{numberOfExtraImg}</p>
        </div>
      );
    }
    return;
  };
  if (elements === undefined) {
    console.log(elements);
    return <h1>coming soon</h1>;
  } else
    return (
      <>
        <table className={css.table}>
          <thead>
            <tr className={css.table_row}>
              <th className={css.table_header}>№</th>
              <th className={css.table_header}>Status</th>
              <th className={css.table_header}>Order date</th>
              <th className={css.table_header}>Summ</th>
              <th className={css.table_header}></th>
            </tr>
          </thead>

          <tbody className={css.list}>
            {elements.map(({ orderId, status, date, summ, items }) => (
              <tr className={css.table_row} key={orderId}>
                <td className={css.table_data}>
                  <Link to={`/user/orders/${orderId}`} className={css.link}>
                    {orderId}
                  </Link>
                </td>
                <td className={css.table_data}> {status}</td>
                <td className={css.table_data}> {date}</td>
                <td className={css.table_data}> ${summ}</td>

                <td className={css.table_data}>
                  <div className={css.img_list}>
                    {markupListOfImg(items)}
                    {markupExtraImgItem(items)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default UserOrdersList;
