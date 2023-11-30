import axios from "axios";

const axiosService = axios.create({
    baseURL: 'https://online-zoo-store-backend-web-service.onrender.com/api/v1',
});

axiosService.interceptors.request.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);

export default axiosService;