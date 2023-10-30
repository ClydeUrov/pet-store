// Функція countSubtotal обчислює підсумкову вартість товарів у кошику на основі інформації з cardsInCart та cardsList.
// cardsInCart - масив об'єктів, які представляють товари у кошику та їхню кількість.
// cardsList - масив об'єктів, які містять інформацію про всі доступні товари та їхню ціну.

export const countSubtotal = (cardsInCart, cardsList) => {
  // Створюємо масив subtotalArr, в якому зберігаємо підсумкову вартість кожного товару у кошику.
  // Для цього ми проходимося по кожному об'єкту у cardsInCart і знаходимо відповідний товар у cardsList за id.
  // Після цього множимо кількість товару на його ціну та додаємо результат у масив.
  const subtotalArr = cardsInCart.map(({ id, count }) => {
    const currentCard = cardsList.find(({ id }) => id)
    return currentCard && count * currentCard.price // Повертаємо null, якщо товар не знайдено
  })

  // Обчислюємо загальну вартість усіх товарів у кошику, сумуючи значення масиву subtotalArr.
  // Початкове значення суми (sum) встановлено на 0.
  const subTotal = subtotalArr.reduce((sum, value) => {
    return sum + value
  }, 0)

  return subTotal // Повертаємо підсумкову вартість товарів у кошику.
}
