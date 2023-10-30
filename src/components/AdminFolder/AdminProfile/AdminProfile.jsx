import css from './AdminProfile.module.scss'

const AdminProfile = () => {

    return (
        <div className={css.productContainer}>
            <div className={css.firstLine}>
                    <p>Admin information</p>
            </div>
            <div>
                <p>Surname</p>
                <input />
                <p>E-mail</p>
                <p>example@gmail.com</p>
            </div>
            <div>
                <p>Name</p>
                <input />
                <p>Password</p>
                <input />
                <p>eye</p>
                <p>Edit</p>
            </div>
            <button>Confirm</button>
        </div>
    )
}

export default AdminProfile;