//  Цей код визначає компонент форми замовлення корзини. 
// Він використовує бібліотеку Formik для управління формою та валідацією даних. 
// Коли користувач відправляє форму, вона перевіряється за допомогою схеми валідації 
// BasicFormSchema, і якщо дані введені правильно, вони зберігаються та виводяться в 
// модальному вікні підтвердження замовлення.


import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import styles from './CartForm.module.scss'
import btnStyles from '../Button/Button.module.scss'
import { BasicFormSchema } from './BasicFormSchema'
import { formDataFields } from './formDataFields'
import { FormikInputBlock } from './formFields/FormikInputBlock'
import { NumberFormatInputBlock } from './formFields/NumberFormatInputBlock'
//import { useDispatch } from 'react-redux'
// import { checkoutOrder } from '../../store/cart/actions'
import { user } from '../UserAccount/UserAccount'
//import PropTypes from 'prop-types'

const initialValues = {
  name: user.name,
  surname: user.surname,
  email: user.email,
  phone: '',
  address: '',

};

export const CartForm = () => {
  // const dispatch = useDispatch()
  //  const [values, setValues] = useState(null)

  const handleFormSubmit = (formData) => {
    //  setValues(values)
    // dispatch(checkoutOrder())
    console.log('formData', formData);
  }

  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.cartTitle}>2. Shipping info</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={BasicFormSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <FieldArray
                name="fields"
                render={() => (
                  <>
                    <div className={styles.formInner}>
                      {formDataFields.map(
                        ({ id, name, label, placeholder, type }) => {
                          return name === 'phone' ? (
                            <NumberFormatInputBlock
                              key={id}
                              name={name}
                              type={type}
                              label={label}
                            />
                          ) : (
                            <FormikInputBlock
                              key={id}
                              name={name}
                              type={type}
                              label={label}
                              placeholder={placeholder}
                            />
                          )
                        }
                      )}
                    </div>
                    <button
                      className={`${btnStyles.btn} ${styles.submitBtn}`}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Checkout
                    </button>
                  </>
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

