import axios from "axios";
import { getAccessToken } from "./user.actions";

const baseURL =
  "https://online-zoo-store-backend-web-service.onrender.com/api/v1/";

function getWishList() {
  return axios.get(`${baseURL}wish-lists`, {
    headers: { Authorization: "Bearer " + getAccessToken() },
  });
}

function postItemInWishList(arrOfId) {
  return axios.post(`${baseURL}wish-lists/items`, arrOfId, {
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

export {
  getWishList,
  postItemInWishList,
  clearAllWishList,
  deleteOneItemWishList,
};
