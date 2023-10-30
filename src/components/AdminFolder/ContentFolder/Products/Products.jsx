import { useEffect, useMemo, useState } from "react";
import { getAllCards } from "../../../../redux/cards/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "../../../../redux/cards/selectors";
import css from "./Products.module.scss"
import Pagination from "../../../Pagination/Pagination";
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { Sort } from "../../../Sort/Sort";
import { NavLink } from "react-router-dom";
import Loader from "../../../Loader/Loader";

const Products = () => {
    const dispatch = useDispatch();
    const allCards = useSelector(selectCards);
    const isLoading = useSelector(({ cards }) => cards.isLoading)
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 10;

    useEffect(() => {
        dispatch(getAllCards())
            .then()
            .catch((error) => {
                console.error('Error fetching data:', error);
                
            });
    }, [dispatch]);

    const currentTableData = useMemo(() => {
        if (!allCards || !allCards.content) {
            return [];
        }
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allCards.content.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allCards.content]);

    if (isLoading) {
        return <Loader />;
    }

    if (!allCards || !allCards.content || allCards.content.length === 0) {
        return <div className={css.firstLine}>No data available.</div>;
    }

    console.log(allCards.content);

    return (
        <div className={css.productContainer}>
            <div className={css.firstLine}>
                    <p>Products</p>
                    <div className={css.search}>
                        <input type="text" placeholder="Quick search" />
                    </div>
                    <NavLink to={'create'} type="button" className={css.topButton}>
                        Create
                    </NavLink>
            </div>
            <Sort />
            <div className={css.columnHeaders}>
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Price</p>
                <p>Discount</p>
                <p>Brand</p>
                <p>New</p>
                <p>Available</p>
                <p></p>
            </div>
            {currentTableData.map(item => (
                <div key={item.id} className={item.notAvailable ? css.productRow : `${css.productRow} ${css.notAvailable}`}>
                    <div className={css.picture}>
                        {item.images && item.images.length > 0 && (
                            <img src={item.images[0].filePath} alt="" />
                        )}
                    </div>
                    <div>{item.name}</div>
                    <div>{item.category.name}</div>
                    <div>${item.price}</div>
                    <div>${item.priceWithDiscount ? item.priceWithDiscount : 0}</div>
                    <div>{item.brand ? item.brand.name : "No brand"}</div>
                    <div>{item.newArrival ? 'Yes' : 'No'}</div>
                    <div>{item.notAvailable ? 'In stock' : 'Out of stock'}</div>
                    <div><MdOutlineEdit /> <AiOutlineDelete /></div>
                </div>
            ))}
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={allCards.content.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
}

export default Products;