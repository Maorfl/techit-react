import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteProduct } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";

interface DeleteProductModalProps {
    show: boolean,
    onHide: Function
    render: Function
    product: Product
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({ show, onHide, render, product }) => {
    return (
        <>
            <Modal show={show} onHide={() => onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete {product.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => {
                        deleteProduct(product._id as string);
                        render();
                        onHide();
                        successMsg("Product deleted successfully!");
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteProductModal;