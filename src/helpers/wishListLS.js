export { getWishListLS, setWishListLS };

const wishListNoUser = "wishListNoUser";

function getWishListLS() {
  const wishList = localStorage.getItem(wishListNoUser);

  return JSON.parse(wishList);
}

function setWishListLS(items) {
  localStorage.setItem(wishListNoUser, JSON.stringify(items));
}
