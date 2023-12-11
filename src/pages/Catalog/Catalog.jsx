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
import { useLocation } from 'react-router-dom';

const Catalog = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');
  const [urlCategory, setUrlCategory] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState("");
  const [page, setPage] = useState(1); // Set an initial value for page
  const [characteristics, setCharacteristics] = useState({
    age: [],
    brand: [],
    category: null,
    color: [],
    material: [],
    prescription: [],
    size: [],
    weight: [],
  });
  const [selected, setSelected] = useState([]);
  const [fetched, setFetched] = useState(false);
  console.log(urlCategory);

  const dispatch = useDispatch();
  const { totalElements } = useSelector(selectCards);

  useEffect(() => {
    setUrlCategory(pathSegments[pathSegments.length - 1].split('-'));
  }, [pathname]);

  useEffect(() => {
    setFetched(false);
  }, [page, selected, sortMethod, notAvailable, urlCategory]);

  useEffect(() => {
    if (!fetched) {
      fetchProductCharacteristics()
        .then(setCharacteristics)
        .catch(error => console.log('Error', error))
        .finally(() => setFetched(true));
    }
  }, [fetched]);

  useEffect(() => {
    if (fetched) {
      dispatch(getAllCards({ page, urlCategory, selected, sortMethod, notAvailable }));
    }
  }, [fetched, dispatch, page, selected, sortMethod, notAvailable, urlCategory]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={css.title}>for {urlCategory[0]}</h2>
        <div className={css.sort_part}>
          {totalElements ? 
            (<p className={css.sort_quantity}>{totalElements} Products found</p>) : 
            (<p className={css.sort_quantity}></p>)
          }
          <SaleCheckbox title="On sale" onChange={(isChecked) => setNotAvailable(isChecked)} checked={notAvailable} />
          <Sort setSortMethod={setSortMethod} isOpen={sortOpen} setIsOpen={setSortOpen}/>
        </div>
        <div className={css.box}>
          <div className={css.filters}>
            <Accordion
              characteristics={characteristics}
              urlCategory={urlCategory}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <CardsList setPage={setPage} />
        </div>
      </div>
    </section>
  );
}

export default Catalog;
