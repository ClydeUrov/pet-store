import { ErrorMessage, useField } from 'formik' // Імпортуємо компоненти ErrorMessage та useField з бібліотеки Formik
import styles from '../CartForm.module.scss' // Імпортуємо стилі для компонента
import { NumericFormat } from 'react-number-format' // Імпортуємо компонент NumberFormat для форматування введеного номера телефону
// import PropTypes from 'prop-types'; // Імпортуємо PropTypes для валідації властивостей компонента

export const NumberFormatInputBlock = ({
  name,
  label,
  id,
  placeholder,
  type,
}) => {
  const [field] = useField(name) // Використовуємо useField для створення полів форми

  return (
    <div key={id} className={styles.fieldContainer}>
      <label className={styles.orderLabel} htmlFor={name}>
        {label}
      </label>
      <NumericFormat
        {...field} // Передаємо всі властивості поля форми, отримані з useField, в NumberFormat
        className={styles.orderInput}
        format="" // Формат номера телефону
        mask="_" // Дозволяємо пусте форматування та встановлюємо маску "_"
        name={name}
        id={name} 
        placeholder={placeholder}
        type={type}
      />
      <ErrorMessage component="p" className={styles.fieldError} name={name} />
    </div>
  )
}

// NumberFormatInputBlock.propTypes = {
//     id: PropTypes.string,
//     name: PropTypes.string.isRequired, // name є обов'язковою строковою властивістю
//     placeholder: PropTypes.string, // placeholder є необов'язковою строковою властивістю
//     type: PropTypes.string, // type є необов'язковою строковою властивістю
//     label: PropTypes.string.isRequired, // label є обов'язковою строковою властивістю
// }

// NumberFormatInputBlock.defaultProps = {
//   placeholder: '', // За замовчуванням, якщо placeholder не передано, він буде порожнім рядком
//   type: 'text', // За замовчуванням, якщо type не передано, він буде 'text'
//   id: '', // За замовчуванням, якщо id не передано, він буде порожнім рядком
// }
