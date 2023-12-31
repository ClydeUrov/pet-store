import React from 'react'
import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { selectCards } from '../../redux/cards/selectors';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';


const CardsList = ({setPage}) => {
  const cards = useSelector(selectCards) || {};
  const { content } = cards || {};

  return (
    <>
      {content ? (
        <div>
          <ul className={styles.list} >
            {content.map(item => {
              return <Card key={item.id} item={item} />;
            })}
          </ul>
          <Pagination
            className="pagination-bar"
            currentPage={cards.number + 1}
            totalCount={cards.totalElements}
            pageSize={cards.size}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default CardsList;
