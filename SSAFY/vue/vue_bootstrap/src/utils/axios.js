// axios 를 사용하기 위해 파일을 작성한다!

import axios from "axios";

const request = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
}); // 이렇게 하면, request.get("/todos")는 axios.get("https://jsonplaceholder.typicode.com/todos") 와 같아진다!

export const api = {
    jsonplaceholder:{
        findAll: () => request.get("/todos"),
        findOne: (id) => request.get(`/todos/${ id }`)
    }
}