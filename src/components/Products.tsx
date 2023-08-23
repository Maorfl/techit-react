import { FunctionComponent, useEffect, useState } from "react";
import Header from "./Header";
import Product from "../interfaces/Product";
import { getAllProducts } from "../services/productsService";
import DeleteProductModal from "./DeleteProductModal";
import UpdateProductModal from "./UpdateProductModal";
import AddProductsModal from "./AddProductsModal";
import { addToCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";

interface ProductsProps {

}

const Products: FunctionComponent<ProductsProps> = () => {
    let [products, setProducts] = useState<Product[]>([]);
    let [currentProduct, setCurrentProduct] = useState<Product>({
        name: "",
        price: 0,
        category: "",
        image: "",
        description: ""
    });
    let [isChanged, setIsChanged] = useState<boolean>(false);
    let [showAddModal, setShowAddModal] = useState<boolean>(false);
    let [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    let [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    let render = () => setIsChanged(!isChanged);

    let handleAddToCart = (productToAdd: Product, quantity: number) => {
        // console.log(productToAdd);

        addToCart({ ...productToAdd, quantity: quantity })
            .then((res) => successMsg("Product added to cart!"))
            .catch((error) => console.log(error))
    }


    useEffect(() => {
        getAllProducts()
            .then((res) => setProducts(res.data))
            .catch((error) => console.log(error))
    }, [isChanged]);
    return (
        <>
            <Header />
            <h1 className="text-center">Products</h1>
            {sessionStorage.getItem("isAdmin") == "true" &&
                <div className="text-center">
                    <button className="btn btn-success btn-lg mt-1 mb-4" onClick={() => setShowAddModal(true)}><i className="fa-solid fa-plus"></i> Add Products</button>
                </div>}
            {products.length ? (
                <div className="container">
                    <div className="row">
                        {products.map((product: Product) =>
                            <div className="card col-md-4 mx-2" key={product._id} style={{ width: "18rem" }}>
                                <img src={product.image} className="card-img-top" alt={product.name} style={{ width: "16.5rem", height: "16.5rem" }} />
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{product.category}</h6>
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text text-success">{product.price}₪</p>
                                    {sessionStorage.getItem("isAdmin") == "true" ? (
                                        <div className="d-flex ms-2">
                                            <button className="btn btn-sm btn-primary w-50 me-2" onClick={() => handleAddToCart(product, product.quantity ? product.quantity as number : 0)}><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                                            <button className="btn btn-warning me-2" onClick={() => {
                                                setCurrentProduct(product);
                                                setShowUpdateModal(true);
                                            }}><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button className="btn btn-danger" onClick={() => {
                                                setCurrentProduct(product);
                                                setShowDeleteModal(true);
                                            }}>
                                                <i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-primary w-100" onClick={() => handleAddToCart(product, product.quantity ? product.quantity as number : 0)}>Add to Cart</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>There are no products!</p>
            )}

            <AddProductsModal show={showAddModal} onHide={() => setShowAddModal(false)} render={render} />
            <UpdateProductModal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} render={render} product={currentProduct} />
            <DeleteProductModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} render={render} product={currentProduct} />
        </>
    );
}

export default Products;