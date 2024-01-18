function UserLoginLogoutSubscribe(event, listener) {
  document.addEventListener(event, listener);
}

function UserLoginLogoutUnsubscribe(event, listener) {
  document.removeEventListener(event, listener);
}

function UserLoginLogoutPublish(eventName) {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
}

function emptyWishList() {
  const event = new CustomEvent("EmptyWishList");
  document.dispatchEvent(event);
}

function emptyWishListSubscribe(listener) {
  document.addEventListener("EmptyWishList", listener);
}

function emptyWishListUnsubscribe(listener) {
  document.removeEventListener("EmptyWishList", listener);
}
function smthInWishList() {
  const event = new CustomEvent("SmthInWishList");
  document.dispatchEvent(event);
}

function smthInWishListSubscribe(listener) {
  document.addEventListener("SmthInWishList", listener);
}

function smthInWishListUnsubscribe(listener) {
  document.removeEventListener("SmthInWishList", listener);
}

export {
  UserLoginLogoutPublish,
  UserLoginLogoutSubscribe,
  UserLoginLogoutUnsubscribe,
  emptyWishList,
  emptyWishListSubscribe,
  emptyWishListUnsubscribe,
  smthInWishList,
  smthInWishListSubscribe,
  smthInWishListUnsubscribe,
};
