export { getWishListLS, setWishListLS, handleAddOrDeleteItemWishList };

const wishList = "wishList";

function getWishListLS() {
  const dataLS = localStorage.getItem(wishList);
  if (!dataLS) return [];
  return JSON.parse(dataLS);
}

function setWishListLS(items) {
  localStorage.setItem(wishList, JSON.stringify(items));
}

async function handleAddOrDeleteItemWishList(item, favoriteItems, setFunction) {
  if (!!favoriteItems.find((i) => i.id === item.id)?.id) {
    try {
      const corrWishList = favoriteItems.filter((i) => i.id !== item.id);
      console.log("WISH LIST LS", favoriteItems);
      console.log("WISH LIST LS", corrWishList);

      setWishListLS(corrWishList);
      setFunction(corrWishList);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const corrWishList = [...favoriteItems, item];

      setWishListLS(corrWishList);
      setFunction(corrWishList);
    } catch (error) {
      console.log(error);
    }
  }
}
