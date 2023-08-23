import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

const api: string = `${process.env.REACT_APP_API}`;

//Register

export function addUser(newUser: User) {
    return axios.post(`${api}/register`, newUser);
}

//Login

export function checkUser(checkedUser: User) {
    return axios.post(`${api}/login`, checkedUser);
}

export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string);
    return jwt_decode(token);
}