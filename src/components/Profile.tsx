import { FunctionComponent } from "react";
import Header from "./Header";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    return (
        <>
            <Header />
            <div className="card mt-3 ms-3" style={{ width: "20%" }}>
                <div className="row">
                    <div className="col-md-4">
                        <img src="profile.webp" alt="Proflie Picture" className="img-fluid rounded-circle" style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-8 text-center">
                        <h5>{sessionStorage.getItem("userName")}</h5>
                        <p>{sessionStorage.getItem("userEmail")}</p>
                        {sessionStorage.getItem("isAdmin") == "true" && <p>This user is an <b>Admin</b></p>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Profile;