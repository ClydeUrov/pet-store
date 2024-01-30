import { useCallback, useState } from 'react';
import Sort from '../../Sort/Sort';
import css from './Orders.module.scss'
import Loader from '../../Loader/Loader';
import OrderCards from './OrderCards';


const Orders = () => {
  const [nameLike, setNameLike] = useState('');
  const [page, setPage] = useState(1);
  const [sortMethod, setSortMethod] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allOrders, setAllOrders] = useState({});
  // const isLoading = useSelector(({ cards }) => cards.isLoading);

  const handleInputChange = useCallback((e) => {
    setNameLike(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className={css.productContainer}>
      <div className={css.firstLine}>
        <p>Orders</p>
        <div className={css.search}>
          <input
            type="text"
            placeholder="Quick search"
            value={nameLike}
            onChange={handleInputChange}
          />
        </div>
        <p></p>
      </div>
      <Sort setSortMethod={setSortMethod} isOpen={isOpen} setIsOpen={setIsOpen}/>
      {!allOrders ? (
        <Loader />
      ) : (
        allOrders?.content ? (
          <OrderCards
            allOrders={allOrders} 
            setPage={setPage} 
            // dispatch={dispatch} 
            // setPrevLength={setPrevLength}
            // setUpdateProduct={setUpdateProduct}
          />
        ) : (
          <div className={css.firstLine}>
            No data available.
          </div>
        )
      )}
    </div>
  );
}

export default Orders;