function CartAddEventSubscribe(listener) {
  document.addEventListener("AddToCart", listener);
}

function CartAddEventUnSubscribe(listener) {
  document.removeEventListener("AddToCart", listener);
}

function CartAddEventPublish(newCartQuantity) {
  const event = new CustomEvent("AddToCart", {
    detail: {
      action: newCartQuantity.action,
      ids: newCartQuantity.id
    },
  });
  document.dispatchEvent(event);
}

export {
  CartAddEventPublish,
  CartAddEventSubscribe,
  CartAddEventUnSubscribe,
};