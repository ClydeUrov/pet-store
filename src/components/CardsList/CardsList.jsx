import React from 'react'
import Card from '../Card/Card'
import styles from './CardsList.module.scss'
import { selectCards } from '../../redux/cards/selectors';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { RotatingLines } from 'react-loader-spinner';


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
        <div style={{margin: "80px 200px"}}>
          <RotatingLines
            strokeColor="#ffad4d"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  )
}

export default CardsList;
