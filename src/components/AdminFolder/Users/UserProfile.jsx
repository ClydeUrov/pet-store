import { useParams } from "react-router-dom";
import css from "./Users.module.scss"

const UserProfile = () => {
    const { userId } = useParams();
    console.log("UserProfile", userId);
    const userValues = [
        { name:"surname", value: "Rhye", label: "Surname" },
        { name:"address", value: "Ukraine, Kyiv oblast, Kyiv, Illienka 36/1 Str. 75012", label: "Address" },
        { name:"role", value: "User", label: "Role" },
        { name:"name", value: "Olivia", label: "Name" },
        { name:"e-mail", value: "oliviarhye@gmail.com", label: "E-mail" },
        { name:"created", value: "25.05.2022", label: "Created on" },
        { name:"status", value: "Active", label: "Status" },
        { name:"agreement", value: "Agreed", label: "Terms of use agreement" },
        { name:"subscription", value: "Subscribed", label: "E-mail subscription" },
    ]

    return (
        <div className={css.userContainer}>
            <div className={css.firstLine}>
                <p>User information</p>
            </div>
            <div className={css.userInformation}>
                {userValues.map(item => {
                    return <div key={item.name}>
                        <label htmlFor={item.name} className={css.label}>{item.label}</label>
                        <p>{item.value}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default UserProfile;