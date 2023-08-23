import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getCart } from "../services/cartService";
import Header from "./Header";

interface CartProps {

}

const Cart: FunctionComponent<CartProps> = () => {
    let [productsInCart, setProductsInCart] = useState<Product[]>([]);

    useEffect(() => {
        // let userId: number = JSON.parse(sessionStorage.getItem("userId") as string);
        getCart()
            .then((res) => {
                if (res.data.length)
                    setProductsInCart(res.data)
            })
            .catch((error) => console.log(error))
    }, []);
    return (
        <>
            <Header />
            <h2 className="text-center display-4 mb-4">Cart</h2>
            <div className="container">
                {productsInCart.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsInCart.map((product: Product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity as number > 0 ? product.quantity : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h3 className="text-center">No products in cart</h3>
                )}
            </div>
        </>
    );
}

export default Cart;