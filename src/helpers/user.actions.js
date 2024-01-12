import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { UserLoginLogoutPublish } from "./events/LoginLogout";

const baseURL =
  "https://online-zoo-store-backend-web-service.onrender.com/api/v1/";

function useUserActions() {
  const navigate = useNavigate();
  // const baseURL = process.env.REACT_APP_API_URL;

  return {
    login,
    register,
    logout,
    editProfile,
    editPassword,
    profile,
    getCarts,
    deleteCart,
    deleteAllCarts,
    postCarts
  };

  // Get profile
  function profile() {
    return axios.get(`${baseURL}users/profile`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  }

  // Edit the user
  function editProfile(data, dataInStorage) {
    return axiosService
      .patch(`${baseURL}users/profile`, data, {
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      })
      .then((res) => {
        // Registration the account in the store
        if (res.status === 200)
          localStorage.setItem(
            "auth",
            JSON.stringify({
              access: getAccessToken(),
              refresh: getRefreshToken(),
              user: { ...dataInStorage },
            })
          );
      });
  }

  function editPassword(data) {
    return axiosService.patch(`${baseURL}users/password`, data, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    });
  }

  // Login the user
  function login(data) {
    return axios.post(`${baseURL}auth/login`, data).then((res) => {
      setUserData(res.data);
      UserLoginLogoutPublish("UserLogin");
      if (res.data.userDto.role === "CLIENT") {
        navigate("user/account");
      }
      if (res.data.userDto.role === "ADMIN") {
        navigate("admin/orders");
      }
    });
  }

  // Login the user
  function register(data, path) {
    return axios
      .post(`${baseURL}auth/register?path=${path}`, data)
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}auth/logout`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("cart");
        localStorage.removeItem("constants");
        UserLoginLogoutPublish("UserLogout");
        navigate("/");
      });
  }

  async function getCarts() {
    return await axiosService.get(`${baseURL}carts`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    }).then((resp) => resp.data)
  }

  async function postCarts(data) {
    return await axiosService.post(`${baseURL}carts/items`, data, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    }).then((resp) => resp.data)
  }

  function deleteCart(itemId) {
    return axiosService.delete(`${baseURL}carts/items/${itemId}`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    })
  }

  function deleteAllCarts() {
    return axiosService.delete(`${baseURL}carts/items`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    })
  }
}

function useAdminActions() {
  const sendRequest = async (method, path, data) => {
    const response = await axiosService({
      method,
      url: `${baseURL}${path}`,
      data,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  };

  return {
    users: () => sendRequest("get", "users"),
    create: (path, data) => sendRequest("post", path, data),
    update: (path, data) => sendRequest("put", path, data),
    deleteAction: (path) => sendRequest("delete", path),
    updateStatus: (path) => sendRequest("patch", path),
  };
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.accessToken,
      refresh: data.refreshToken,
      user: data.userDto,
    })
  );
}

export {
  useUserActions,
  useAdminActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
