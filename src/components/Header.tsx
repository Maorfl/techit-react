import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    let navigate = useNavigate();
    let logOut = () => {
        // sessionStorage.removeItem("userEmail");
        // sessionStorage.removeItem("userName");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userEmail");
        navigate("/");
    }
    return (
        <>
            {sessionStorage.getItem("token") ?
                (
                    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to={"/home"}>TECHIT</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/cart"}>Cart</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={"/profile"}>Profile</NavLink>
                                    </li>
                                </ul>
                                <div className="position-absolute end-0 me-3">
                                    <button className="btn btn-outline-primary" onClick={() => logOut()}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                ) : (
                    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to={"#"}>TECHIT</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                )
            }
        </>
    );
}

export default Header;