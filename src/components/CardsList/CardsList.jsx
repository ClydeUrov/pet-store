import React from 'react'
import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { selectCards } from '../../redux/cards/selectors';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';


const CardsList = () => {

  const cards = useSelector(selectCards);



  const { content } = cards;

  return (
    <>
      {content ? (
        <ul
          className={styles.list}
        >
          {content.map(item => {
            return <Card key={item.id} item={item} />;
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </>

  )

}



export default CardsList;
