import { Form, Formik } from 'formik';
import css from './AdminProfile.module.scss'
import FormikField from '../../FormikFolder/FormikField';
import Button from '../../CustomButton/Button';

const AdminProfile = () => {
    const adminInformation = [
        {
            name: "surname",
            type: "text",
            label: "Surname",
            width: "276px",
            value: "",
            required: false,
        },
        {
            name: "email",
            type: "unstyled",
            label: "E-mail",
            width: "276px",
            value: "oliviarhye@gmail.com",
        },
        {
            name: "name",
            type: "text",
            label: "Name",
            width: "276px",
            value: "",
            required: true,
        },
        {
            name: "password",
            type: "password",
            label: "Password",
            width: "276px",
            value: "",
            required: true,
        }
    ]

    const handleSubmit = async (values) => {
        console.log("Відправлено дані: ", values);
    };

    return (
        <div className={css.productContainer}>
            <div className={css.firstLine}>
                    <p>Admin information</p>
            </div>
            <Formik
                initialValues={{surname: '', email: 'oliviarhye@gmail.com', name: '', password: ''}}
                onSubmit={handleSubmit}
            >
                {() => (
                <Form className={css.form}>
                    <div className={css.product}>
                        {adminInformation.map((field, index) => {
                        return <FormikField key={field.name} {...field} />
                        })}
                    </div>
                    <Button className={css.btn} buttonSize={'padding'} text="Confirm" onClickHandler={handleSubmit}  />
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default AdminProfile;