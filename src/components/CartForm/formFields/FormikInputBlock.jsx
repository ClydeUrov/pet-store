import { Field, ErrorMessage } from 'formik'; // Імпортуємо компоненти Field та ErrorMessage з бібліотеки Formik
import styles from '../CartForm.module.scss'; // Імпортуємо стилі для компонента
// import PropTypes from 'prop-types'; // Імпортуємо PropTypes для валідації властивостей компонента

export const FormikInputBlock = ({ id, name, placeholder, type, label }) => {
    return <div key={id} className={styles.fieldContainer}>
        <label className={styles.orderLabel} htmlFor={name}>{label}</label>
        <Field className={styles.orderInput}
            key={id}
            id={name}
            name={name}
            placeholder={placeholder}
            type={type} />
        <ErrorMessage component="p" className={styles.fieldError} name={name} />
    </div>
}

// FormikInputBlock.propTypes = {
//     id: PropTypes.string,
//     name: PropTypes.string.isRequired, // name є обов'язковою строковою властивістю
//     placeholder: PropTypes.string, // placeholder є необов'язковою строковою властивістю
//     type: PropTypes.string, // type є необов'язковою строковою властивістю
//     label: PropTypes.string.isRequired, // label є обов'язковою строковою властивістю
// };

// FormikInputBlock.defaultProps = {
//     placeholder: '', // За замовчуванням, якщо placeholder не передано, він буде порожнім рядком
//     type: 'text', // За замовчуванням, якщо type не передано, він буде 'text'
//     id: '', // За замовчуванням, якщо id не передано, він буде порожнім рядком
// };
