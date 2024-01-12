import React, { useRef } from "react";
import styles from "../../App/App.module.scss";
import css from "./ProductPage.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectAllItems } from "../../redux/cards/selectors";
import { fetchProductById } from "../../helpers/api";
import { useState, useEffect } from "react";
import { selectOnSale } from "../../redux/cards/selectors";
import { ProductSlider } from "../../components/ProductInfo/ProductSlider/ProductSlider";
import Button from "../../components/CustomButton/Button";
import ProductAbout from "../../components/ProductInfo/ProductAbout/ProductAbout";
import ProductInstructions from "../../components/ProductInfo/ProductInstructions/ProductInstructions";
import ProductReviews from "../../components/ProductInfo/ProductReviews/ProductReviews";
import SliderForHomepage from "../../components/SliderForHomepage/SliderForHomepage";

import StarRatingNew from "../../components/StarRatings/StarRatingNew";
import { useParams } from "react-router-dom";
import { useConstants } from "../../helpers/routs/ConstantsProvider";

import useWishList from "../../helpers/wishList.actions";
import {
  smthInWishList,
  emptyWishList,
} from "../../helpers/events/LoginLogout";
import { getOnSale } from "../../redux/cards/operations";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [showAboutPage, setShowAboutPage] = useState(true);
  const [showInstructionsPage, setShowInstructionsPage] = useState(false);
  const [showReviewsPage, setShowReviewsPage] = useState(false);
  const [product, setProduct] = useState(null);
  const { constants } = useConstants();
  const allItems = useSelector(selectAllItems);
  const productInfo = useRef();
  const [slidesPerView, setSlidesPerView] = useState(
    Math.floor(window.innerWidth / 300)
  );
  const { productId } = useParams();
  const { getWishList, deleteOneItemWishList, postItemInWishList } =
    useWishList();
  const [favoriteItems, setFavoriteItems] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false);
  const { content: cardsOnSale } = useSelector(selectOnSale);
  const [quantityOfItemToAddInCart, setQuantityOfItemToAddInCart] = useState(1);

  useEffect(() => {
    async function fetchWishList() {
      try {
        setIsLoading(true);
        const wishList = await getWishList();
        setFavoriteItems(wishList.data.products);
        setIsFavorite(() =>
          wishList.data.products.find((i) => i.id === product?.id)
            ? true
            : false
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishList();
  }, []);

  useEffect(() => {
    if (favoriteItems.length >= 1) {
      smthInWishList();
    } else if (favoriteItems.length === 0) {
      emptyWishList();
    }
  }, [favoriteItems.length]);

  useEffect(() => {
    const handleWindowResize = () => {
      setSlidesPerView(Math.floor(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cardsOnSale.length || cardsOnSale.isLoading) return;
    dispatch(getOnSale());
  }, [dispatch, cardsOnSale]);

  useEffect(() => {
    if (
      cardsOnSale?.length > 0 &&
      cardsOnSale.some((e) => e.id === +productId)
    ) {
      setProduct(cardsOnSale.find((e) => e.id === +productId));
    } else if (
      allItems.items.content?.length > 0 &&
      allItems.items.content.some((e) => e.id === +productId)
    ) {
      setProduct(allItems.items.content.find((e) => e.id === +productId));
    } else {
      setIsLoading(true);
      fetchProductById(productId)
        .then(setProduct)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, [productId, allItems.items, cardsOnSale]);

  if (!product || !cardsOnSale || !favoriteItems || isLoading) {
    return <Loader />;
  }

  const productNoAvaible = product.notAvailable;
  function handleChangeQuantityOfItem(action) {
    if (action === "+" && quantityOfItemToAddInCart < 100)
      setQuantityOfItemToAddInCart((quantity) => quantity + 1);
    if (action === "-" && !(quantityOfItemToAddInCart === 1))
      setQuantityOfItemToAddInCart((quantity) => quantity - 1);
  }

  async function handleAddOrDeleteFavorite(item) {
    if (!!favoriteItems.find((i) => i.id === item.id)?.id) {
      try {
        setFavoriteIsLoading(true);
        await toast.promise(deleteOneItemWishList(item.id), {
          error: "Sorry, something went wrong",
        });
        setFavoriteItems((items) => items.filter((i) => i.id !== item.id));
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      } finally {
        setFavoriteIsLoading(false);
      }
    } else {
      try {
        setFavoriteIsLoading(true);
        await toast.promise(postItemInWishList(item.id), {
          error: "Sorry, something went wrong",
        });
        setFavoriteItems((items) => [...items, item]);
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      } finally {
        setFavoriteIsLoading(false);
      }
    }
  }

  function handleSetStarRating(e) {
    console.log(`You set rating to ${e}`);
  }

  function handlerClickOnSaleItem() {
    productInfo.current.scrollIntoView();
  }

  function handleSwitchToPage(switchToPage) {
    if (switchToPage === "about") {
      setShowAboutPage(true);
      setShowInstructionsPage(false);
      setShowReviewsPage(false);
    }
    if (switchToPage === "instructions") {
      setShowAboutPage(false);
      setShowInstructionsPage(true);
      setShowReviewsPage(false);
    }
    if (switchToPage === "reviews") {
      setShowAboutPage(false);
      setShowInstructionsPage(false);
      setShowReviewsPage(true);
    }
  }

  return (
    <section className={css.section}>
      <div className={styles.container}>
        <div className={css.product_info} ref={productInfo}>
          <ProductSlider items={product} />

          <div className={css.product_text}>
            {product.notAvailable ? (
              <p className={css.product_not}>Out of stock</p>
            ) : (
              <p className={css.product_in}>In stock</p>
            )}
            <h1 className={css.product_title}>{product.name}</h1>
            <div className={css.product_rating}>
              <StarRatingNew
                size={24}
                color="#FFBD71"
                onSetRating={handleSetStarRating}
              />
              <span className={css.product_rating_text}>0 reviews</span>
            </div>

            {product.priceWithDiscount ? (
              <div className={css.product_price_box}>
                <p
                  className={
                    css.product_price + " " + css.product_price_with_discount
                  }
                >
                  {constants[1].value} {product.priceWithDiscount}
                </p>
                <p className={css.product_price_not}>
                  {constants[1].value} {product.price}
                </p>
              </div>
            ) : (
              <div className={css.product_price_box}>
                <p className={css.product_price}>
                  {constants[1].value} {product.price}
                </p>
              </div>
            )}

            {!productNoAvaible && (
              <div className={css.product_quantity}>
                <button
                  type="button"
                  className={css.btn_quantity}
                  onClick={() => handleChangeQuantityOfItem("-")}
                >
                  <AiOutlineMinus size={13} />
                </button>
                <p className={css.quantity}>{quantityOfItemToAddInCart}</p>
                <button
                  type="button"
                  className={css.btn_quantity}
                  onClick={() => handleChangeQuantityOfItem("+")}
                >
                  <AiOutlinePlus size={13} />
                </button>
              </div>
            )}

            <div className={css.product_btn}>
              <Button
                text="Add to card"
                buttonSize={"large"}
                isDisabled={productNoAvaible}
              />
              <button
                onClick={() => handleAddOrDeleteFavorite(product)}
                disabled={favoriteIsLoading}
                className={`${css.favourite_icon} ${isFavorite && css.full} ${
                  favoriteIsLoading ? css.notAllowed : css.allowed
                }`}
              >
                {!isFavorite ? (
                  <AiOutlineHeart size={44} />
                ) : (
                  <AiFillHeart size={44} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={css.product_info_box}>
          <ul className={css.link_list}>
            <li className={css.link_item}>
              <span
                onClick={() => handleSwitchToPage("about")}
                className={
                  showAboutPage ? `${css.link_title} active` : css.link_title
                }
              >
                About the product
              </span>
            </li>
            {product.instructions && (
              <li className={css.link_item}>
                <span
                  onClick={() => handleSwitchToPage("instructions")}
                  className={
                    showInstructionsPage
                      ? `${css.link_title} active`
                      : css.link_title
                  }
                >
                  Feeding instructions
                </span>
              </li>
            )}
            <li className={css.link_item}>
              <span
                onClick={() => handleSwitchToPage("reviews")}
                className={
                  showReviewsPage ? `${css.link_title} active` : css.link_title
                }
              >
                Reviews
              </span>
            </li>
          </ul>

          {showAboutPage && <ProductAbout product={product} />}
          {showInstructionsPage && (
            <ProductInstructions instructions={product.instructions} />
          )}
          {showReviewsPage && <ProductReviews />}
        </div>

        <SliderForHomepage
          favoriteItems={favoriteItems}
          onChangeFavorites={handleAddOrDeleteFavorite}
          onClick={handlerClickOnSaleItem}
          items={cardsOnSale}
          title="On Sale"
          type="saleSlider"
          slidesPerView={slidesPerView}
        />
      </div>
    </section>
  );
};

export default ProductPage;
