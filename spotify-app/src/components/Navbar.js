import "../css/navbar.css"
import {logout} from "../api/logout.js"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem("userInfo", "");
        localStorage.setItem("access-token", "");
        logout();
        navigate("/auth");
    }
    return(
        <div className = "navbar">
            <span className = "user-welcome">Welcome Daniel</span>
            <span className = "logout" onClick = {handleLogout}>Logout</span>
        </div>
    )
}

export default Navbar;