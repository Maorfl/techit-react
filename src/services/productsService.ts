import axios from "axios";
import Product from "../interfaces/Product";



let api = `${process.env.REACT_APP_API}/products`;

export function getAllProducts() {
    return axios.get(api);
}

export function addProduct(newProduct: Product) {
    return axios.post(api, newProduct, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string),
        },
    });
}

export function getProductById(productId: string) {
    return axios.get(`${api}/${productId}`, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string),
        },
    });
}

export function updateProduct(updatedProduct: Product, productId: string) {
    return axios.put(`${api}/${productId}`, updatedProduct, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string),
        },
    });
}

export function deleteProduct(productId: string) {
    return axios.delete(`${api}/${productId}`, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string),
        },
    });
}