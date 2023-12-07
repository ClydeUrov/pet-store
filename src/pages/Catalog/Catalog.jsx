import React, { useEffect } from 'react'
import styles from '../../App/App.module.scss'
import css from './Catalog.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../../components/CardsList/CardsList'
import Sort from '../../components/Sort/Sort'
import { SaleCheckbox } from '../../components/SaleCheckbox/SaleCheckbox'
import { Accordion } from '../../components/Accordion/Accordion'
import { useState } from 'react';
import { getAllCards } from '../../redux/cards/operations';
import { selectCards } from '../../redux/cards/selectors';
import { fetchProductCharacteristics } from '../../helpers/api';

const Catalog = () => {
  const dispatch = useDispatch();

  const { totalElements } = useSelector(selectCards);
  const [notAvailable, setNotAvailable] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState("");

  const [page, setPage] = useState(null);
  const [selected, setSelected] = useState([]);
  const [characteristics, setCharacteristics] = useState({
    age: [],
    brand: [],
    category: [],
    color: [],
    material: [],
    prescription: [],
    size: [],
    weight: [],
  });
  const [chosenCategory, setChosenCategory] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchProductCharacteristics()
      .then(setCharacteristics)
      .catch(error => console.log('Error', error))
  }, [])

  useEffect(() => {
    setFetched(false);
  }, [page, selected, sortMethod, notAvailable, chosenCategory]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllCards({ page, chosenCategory, selected, sortMethod, notAvailable }))
        .then(() => setPage(1));
    }
  
    if (!fetched) {
      fetchData();
      setFetched(true);
    }
  }, [fetched, dispatch, page, selected, sortMethod, notAvailable, chosenCategory]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={css.title}>for All</h2>
        <div className={css.sort_part}>
          {totalElements ? 
            (<p className={css.sort_quantity}>{totalElements} Products found</p>) : 
            (<p className={css.sort_quantity}></p>)
          }
          <SaleCheckbox title="On sale" onChange={(isChecked) => setNotAvailable(isChecked)} checked={notAvailable} />
          <Sort setSortMethod={setSortMethod} isOpen={sortOpen} setIsOpen={setSortOpen}/>
          {/* <Sort onClose={toggleOpen} isOpen={isOpen} /> */}
        </div>
        <div className={css.box}>
          <div className={css.filters}>
            <Accordion
              characteristics={characteristics}
              chosenCategory={chosenCategory}
              setChosenCategory={setChosenCategory}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <CardsList setPage={setPage} />
        </div>
      </div>
    </section>
  )
}

export default Catalog;
