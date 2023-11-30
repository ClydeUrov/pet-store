import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";


function useContentActions() {
    const navigate = useNavigate();
    const baseURL = "https://online-zoo-store-backend-web-service.onrender.com/";
    // const baseURL = "http://127.0.0.1:8000/api/v1";

    return {
        edit,
        create,
        del,
        addImage
    };

    function edit(action, data) {
        return axiosService.put(`${baseURL}/api/v1/${action}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },}).then((res) => {
            // Registration the account in the store
            // localStorage.setItem(
            //     "auth",
            //     JSON.stringify({access: getAccessToken(), refresh: getRefreshToken(), user: res.data,})
                
            // );
        });
    }

    function create(action, data) {
        return axiosService.post(`${baseURL}/api/v1/${action}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },}).then((res) => {
        });
    }

    function addImage(action, data) {
        return axiosService.post(`${baseURL}/api/v1/${action}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },}).then((res) => {
        });
    }

    function del(action) {
        return axiosService.delete(`${baseURL}/api/v1/${action}`,)
            .then((res) => {
        });
    }
}

export default useContentActions;