
import * as Yup from 'yup'; // Імпорт бібліотеки Yup для створення схеми валідації

export const BasicFormSchema = Yup.object().shape({
    // Визначення схеми валідації для поля firstName
    firstName: Yup.string()
        .matches(/^[a-zA-Zа-яА-я]+$/, "First name must contain only letters") // Валідація на наявність тільки літер
        .min(2, 'First name must be longer than 2 characters') // Мінімальна довжина 2 символи
        .max(20, 'Too long first name') // Максимальна довжина 20 символів
        .required('Required field'), // Поле є обов'язковим для заповнення

    // Аналогічно визначення схеми валідації для інших полів: lastName, email, age, phone, address
    lastName: Yup.string()
        .matches(/^[a-zA-Zа-яА-я]+$/, "Last name must contain only letters")
        .min(2, 'Last name must be longer than 2 characters')
        .max(20, 'Too long last name')
        .required('Required field'),

    email: Yup.string()
        .email('Invalid email address') // Перевірка на правильний формат електронної адреси
        .required('Required field'),

    age: Yup.number()
        .typeError('Age must be a number') // Повідомлення про помилку, якщо введено не число
        .integer('The age must be an integer') // Перевірка, що введене число є цілим
        .min(18, 'Min age is 18') // Мінімальний вік 18 років
        .max(110, 'Max age is 110') // Максимальний вік 110 років
        .required('Required field'),

    phone: Yup.string()
        .matches(/^[+]?38\s[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/im, "Invalid phone number format") // Перевірка формату номера телефону
        .required('Required field'),

    address: Yup.string()
        .min(3, 'The address must be longer than 3 characters') // Мінімальна довжина адреси 3 символи
        .required('Required field'),
});
