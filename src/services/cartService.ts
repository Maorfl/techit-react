import axios from "axios";
import Product from "../interfaces/Product";
import Cart from "../interfaces/Cart";

let api = `${process.env.REACT_APP_API}/carts`;

export function getCart() {
    return axios.get(api, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function addToCart(productToAdd: Product) {
    return axios.post(`${api}`, productToAdd, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}