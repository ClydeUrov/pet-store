import css from './CreateProduct.module.scss'
import { Formik } from 'formik';
import DownloadImages from './DownloadImages';

// const initialValues = {
//     name: product.name,
//     category: user.surname,
//     brand: user.email,
//     availability: "qweqweqwe",
//     confirm: "qweqweqwe",
// };

const CreateProduct = () => {



    const handleSubmit = async (formData) => {
        const newInfo = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            confirm: formData.confirm,
        };
        console.log("newInfo", newInfo);
        // toggleDisabled();
        // handleBtnDisable();
        // dispatch(addNewUser(newUser));
        return;
    };
    
    
    
    return (
        <div className={css.productContainer}>
            <div className={css.firstLine}>
                <p>Product information</p>
            </div>

            <DownloadImages />

            <Formik
                // validationSchema={schemaUserShippingInfo}
                // initialValues={initialValues}
                onSubmit={handleSubmit}
            >

            <h3>Product information</h3>
            <h3>Basic information</h3>
            <section>
                <p>Name</p>
                <input />
                <div>
                    <p>Category</p>
                    <input placeholder="Food" />
                    <p>Brand</p>
                    <input placeholder="wiskas" />
                </div>
                <div>
                    <p>Availability</p>
                    <input placeholder="Food" />
                    <p>Price per unit</p>
                    <input placeholder="wiskas" />
                    <p>Price on discount</p>
                    <input placeholder="wiskas" />
                </div>
                <div>
                    <p>Material</p>
                    <input placeholder="Food" />
                    <p>Color</p>
                    <input placeholder="wiskas" />
                </div>
                <div>
                    <p>Age</p>
                    <input placeholder="Food" />
                    <p>Size</p>
                    <input placeholder="wiskas" />
                </div>
                <div>
                    <p>Weight</p>
                    <input placeholder="Food" />
                    <p>Size</p>
                    <button /> 
                </div>
            </section>
            <h3>Additionsl information</h3>
            <section>
                <div>
                    <p>Prescription</p>
                    <input placeholder="Food" />
                    <p>Contraindications</p>
                    <input placeholder="wiskas" /> 
                </div>
                <div>
                    <p>Description</p>
                    <input placeholder="Food" />
                </div>
                <div>
                    <p>Instruction</p>
                    <input placeholder="Food" />
                </div>
            </section>

            </Formik>

            <div>
                <button>Confirn</button>
                <button>Cancel</button>
            </div>

        </div>
    )

}

export default CreateProduct;