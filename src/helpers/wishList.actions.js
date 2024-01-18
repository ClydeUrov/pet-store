import axios from "axios";
import { getAccessToken } from "./user.actions";

const baseURL =
  "https://online-zoo-store-backend-web-service.onrender.com/api/v1/";

function useWishList() {
  return {
    getWishList,
    postItemInWishList,
    clearAllWishList,
    deleteOneItemWishList,
  };

  function getWishList() {
    return axios.get(`${baseURL}wish-lists`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  }

  function postItemInWishList(id) {
    return axios.post(`${baseURL}wish-lists/items/${id}`, null, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });
  }

  function deleteOneItemWishList(id) {
    return axios.delete(`${baseURL}wish-lists/items/${id}`, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });
  }

  function clearAllWishList() {
    return axios.delete(`${baseURL}wish-lists/items`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  }
}

export default useWishList;
