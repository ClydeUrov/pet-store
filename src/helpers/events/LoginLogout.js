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

export {
  UserLoginLogoutPublish,
  UserLoginLogoutSubscribe,
  UserLoginLogoutUnsubscribe,
};
