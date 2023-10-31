import { NavLink, useParams } from 'react-router-dom';
import css from './Users.module.scss'

const Users = () => {
    const { userId, users } = useParams();
    console.log("Users", userId, users)
    
    return (
        <div className={css.userContainer}>
            <div className={css.firstLine}>
                    <p>Users</p>
                    <></>
            </div>
            <NavLink to="123" type="button" className={css.topButton}>
                User 1
            </NavLink>
            <NavLink to="123" type="button" className={css.topButton}>
                User 2
            </NavLink>
            <NavLink to="123" type="button" className={css.topButton}>
                User 3
            </NavLink>
        </div>
    )
}

export default Users;