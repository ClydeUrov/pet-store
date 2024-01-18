export { getWishListLS, setWishListLS };

const wishList = "wishList";

function getWishListLS() {
  const dataLS = localStorage.getItem(wishList);
  if (!dataLS) return [];
  return JSON.parse(dataLS);
}

function setWishListLS(items) {
  localStorage.setItem(wishList, JSON.stringify(items));
}
