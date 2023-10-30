import React, { useEffect } from 'react'
import styles from '../../App/App.module.scss'
import css from './Catalog.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardsList from '../../components/CardsList/CardsList'
import { Sort } from '../../components/Sort/Sort'
import { SaleCheckbox } from '../../components/SaleCheckbox/SaleCheckbox'
import { Accordion } from '../../components/Accordion/Accordion'
import { useState } from 'react';
import { getAllCards, getCardsFromOneCategory } from '../../redux/cards/operations';
import { selectCards } from '../../redux/cards/selectors';
import { makeInnerCategoryId } from '../../helpers/functions';
import { fetchIndicators } from '../../helpers/api';

const Catalog = () => {
  const dispatch = useDispatch();

  const { totalElements } = useSelector(selectCards);

  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);


  let { pathname } = useLocation();
  // let category = pathname.split('/').pop();
  let categoryWithId = pathname.split('/');
  let category = categoryWithId[2].split('-')[0];
  let categoryId = categoryWithId[2].split('-')[1];
  // console.log('category', category);

  let innerCategoryId = makeInnerCategoryId(categoryWithId);

  const [isOpen, setIsOpen] = useState(false);

  const [weights, setWeights] = useState([]);
  const [ages, setAges] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [productSizes, setProductSizes] = useState([]);


  useEffect(() => {
    fetchIndicators('weights')
      .then(setWeights)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('ages')
      .then(setAges)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('brands')
      .then(setBrands)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('colors')
      .then(setColors)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('materials')
      .then(setMaterials)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('prescriptions')
      .then(setPrescriptions)
      .catch(error => {
        console.log('Error', error);
      })
    fetchIndicators('product-sizes')
      .then(setProductSizes)
      .catch(error => {
        console.log('Error', error);
      })
    return;
  }, [])


  // console.log('weights',weights);
  // console.log('ages',ages);
  // console.log('brands',brands);
  // console.log('colors',colors);
  // console.log('materials',materials);
  // console.log('prescriptions',prescriptions);
  // console.log('productSizes',productSizes);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (!category) {
      return;
    }
    if (innerCategoryId) {
      dispatch(getCardsFromOneCategory(innerCategoryId));
      return;
    }
    if (!innerCategoryId) {
      if (category === 'all') {
        dispatch(getAllCards());
        return;
      }
      dispatch(getCardsFromOneCategory(categoryId));
      return;
    }

  }, [innerCategoryId, category, categoryId, dispatch]);


  // Обробник для додавання карток до кошика за їхнім артикулом.
  // const addCardsToCartHandler = (id) => {
  //   dispatch(addToCart(id))
  // }
  // const addCardsToCartHandler = (id) => {
  //   const currentId = { currentId: id } // Створюємо об'єкт з currentId
  //   console.log('addToCart', currentId);
  //   // dispatch(addToCart(currentId)) // Передаємо об'єкт в екшен addToCart
  // }

  // Обробник для зміни статусу "улюблено" для карток за їхнім артикулом.
  // const changeFavouriteHandler = (id) => {
  //   if (cardsInFavorites.includes(id)) {
  //     // Якщо картка вже у списку улюблених, видаляємо її зі списку.
  //     console.log('removeFavourites(id)', id);
  //     // dispatch(removeFavourites(id))
  //   } else {
  //     // Якщо картки немає в списку улюблених, додаємо її туди.
  //     console.log('addToFavourites(id)', id);
  //    // dispatch(addToFavourites(id))
  //   }
  // }


  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={css.title}>for {category}</h2>
        <div className={css.sort_part}>
          {totalElements ? (<p className={css.sort_quantity}>{totalElements} Products found</p>) : (<p className={css.sort_quantity}></p>)}
          <SaleCheckbox />
          <Sort onClose={toggleOpen} isOpen={isOpen} />
        </div>
        <div className={css.box}>
          <div className={css.filters}>
            <Accordion weights={weights} ages={ages} brands={brands} colors={colors} materials={materials} prescriptions={prescriptions} productSizes={productSizes} />
          </div>
          <CardsList />
        </div>
      </div>
    </section>
  )
}

export default Catalog;
