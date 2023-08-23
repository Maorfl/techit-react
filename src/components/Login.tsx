import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser, getTokenDetails } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import Header from "./Header";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {
                        sessionStorage.setItem("token", JSON.stringify(res.data));
                        sessionStorage.setItem("userId", (getTokenDetails() as any)._id);
                        sessionStorage.setItem("isAdmin", (getTokenDetails() as any).isAdmin);
                        sessionStorage.setItem("userEmail", (getTokenDetails() as any).email);
                        successMsg("Logged in successfully");
                        navigate("/home");
                    }
                    else errorMsg("Wrong email or password!");
                })
                .catch((error) => console.log(error))
        }
    })
    return (
        <>
            <Header />
            <div className="container mt-3" style={{ width: "20%" }}>
                <h1 className="display-4 text-center mb-5">Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && <small className="text-danger">{formik.errors.password}</small>}
                        <label htmlFor="floatingPassword">Password</label>
                        <button type="submit" className="btn btn-secondary w-100 mt-4" disabled={!formik.isValid || !formik.dirty}>Login</button>
                    </div>
                </form>
                <p className="text-center mt-4">New user? <Link to={"/register"}>Register here</Link></p>
            </div>
        </>
    );
}

export default Login;