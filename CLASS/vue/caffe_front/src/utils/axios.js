import axios from "axios";

const DOMAIN = "http://caffe.o-r.kr:8080";

const request = axios.create({ // 기본url을 설정한다. 즉.. request.get("~~") -> baseURL/~~~
    baseURL: `${DOMAIN}/api`
});
export const api = {
    menus: {
        findAll: () => request.get("/menus"),
        findOne: (id) => request.get(`/menus/${id}`),

        create: (name, description, file) => {
            // post 요청시 이렇게 formData를 생성해서 보내야 한다.
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('file', file);
            return request.post(`/menus`, formData, {
                headers: { // header도 설정해줘야 한다.
                    "Content-Type": "multipart/form-data"
                }
            })
        },

        update: (id, name, description) => request.patch(`/menus/${id}`, {
            name: name,
            description
        }),

        updateImage: (id, file) => {
            const formData = new FormData();
            formData.append('file', file);
            return request.post(`/menus/${id}`, formData, {
                headers: {
                    "ContentType": "multipart/form-data"
                }
            })
        },

        delete: (id) => request.delete(`/menus/${id}`)
    },

    orders: {
        findAll: () => request.get("/orders"),
        findOne: (id) => request.get(`/orders/${id}`),

        create: (menus_id, quantity, request_detail) => request.post('/orders', {
            menus_id,
            quantity,
            request_detail
        }),

        update: (id, menus_id, quantity, request_detail) => request.patch(`/orders/${id}`, {
            menus_id: menus_id,
            quantity, 
            request_detail
        }),

        delete: (id) => request.delete(`orders/${id}`)
    }
};