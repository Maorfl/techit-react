import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent } from "react";
import { Button, FloatingLabel, Modal, Form } from "react-bootstrap";
import Product from "../interfaces/Product";
import { updateProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacksService";

interface UpdateProductModalProps {
    show: boolean,
    onHide: Function
    render: Function
    product: Product
}

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({ show, onHide, render, product }) => {
    let formik = useFormik({
        initialValues: { name: product.name, price: product.price, category: product.category, description: product.description, image: product.image },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            price: yup.number().required().min(1),
            category: yup.string().required().min(2),
            image: yup.string().required(),
            description: yup.string().required().min(2)
        }),
        onSubmit: (values) => {
            updateProduct(values, product._id as string)
                .then((res) => {
                    render();
                    onHide();
                    successMsg("Product updated successfully!");
                })
                .catch((error) => console.log(error))
        }
    })
    return (
        <>
            <Modal show={show} onHide={() => onHide()} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Add Product</Modal.Title> */}
                    <h2 className="text-center">Add Product</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <FloatingLabel
                                controlId="nameInput"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.name && formik.touched.name && <p><small className="text-danger">{formik.errors.name}</small></p>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="fpriceInput"
                                label="Price"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.price && formik.touched.price && <p><small className="text-danger">{formik.errors.price}</small></p>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="categoryInput"
                                label="Category"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.category && formik.touched.category && <p><small className="text-danger">{formik.errors.category}</small></p>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="imageInput"
                                label="Image"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Image"
                                    name="image"
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.image && formik.touched.image && <p><small className="text-danger">{formik.errors.image}</small></p>}
                            </FloatingLabel>
                            <FloatingLabel controlId="descriptionTextarea" label="Description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Description"
                                    style={{ height: '100px' }}
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.description && formik.touched.description && <p><small className="text-danger">{formik.errors.description}</small></p>}
                            </FloatingLabel>
                        </Form.Group>
                        <Button type="submit" variant="warning" className="w-100">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateProductModal;