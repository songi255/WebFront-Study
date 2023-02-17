import axios from "axios";

const request = axios.create({
    baseURL: "https://fakestoreapi.com/products"
});
export const api = {
    shoppingMall: {
        findAll: () => request.get("/"),
        findOne: (id) => request.get(`/${id}`)
    }
}