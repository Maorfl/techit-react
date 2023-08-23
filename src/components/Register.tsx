import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersService";
import { successMsg } from "../services/feedbacksService";
import Header from "./Header";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            addUser({ ...values, isAdmin: false })
                .then((res) => {
                    successMsg("User registered successfully!");
                    sessionStorage.setItem("token", JSON.stringify(res.data));
                    sessionStorage.setItem("userId", (getTokenDetails() as any)._id);
                    sessionStorage.setItem("isAdmin", (getTokenDetails() as any).isAdmin);
                    sessionStorage.setItem("userEmail", (getTokenDetails() as any).email);
                    successMsg("Registered successfully!");
                    navigate("/home");
                })
                .catch((error) => console.log(error));
        }
    })
    return (
        <>
            <Header />
            <div className="container mt-3" style={{ width: "20%" }} >
                <h1 className="display-4 text-center mb-5">New account</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name && <small className="text-danger">{formik.errors.name}</small>}
                        <label htmlFor="floatingName">Name</label>
                    </div>
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
                        {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
                        <label htmlFor="floatingPassword">Password</label>
                        <button type="submit" className="btn btn-secondary w-100 mt-4" disabled={!formik.isValid || !formik.dirty}>Register</button>
                    </div>
                </form>
                <p className="text-center mt-4">Already have an user? <Link to={"/"}>Login here</Link></p>
            </div>
        </>
    );
}

export default Register;