import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";

const baseURL = "https://online-zoo-store-backend-web-service.onrender.com/api/v1/";

function useUserActions() {
  const navigate = useNavigate();
  // const baseURL = process.env.REACT_APP_API_URL;
  

  return {
    login,
    register,
    logout,
    edit,
    profile,
  };

  // Get profile
  function profile() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    console.log("!", auth?.access)
    return axios.get(`${baseURL}users/profile`, {
      headers: {
        'Authorization': "Bearer " + auth?.access
      }
    })
  }

  

  // Edit the user
  function edit(data, userId) {
    return axiosService
      .patch(`${baseURL}user/${userId}/`, data, {
        headers: { "Content-Type": "multipart/form-data", },
      })
      .then((res) => {
        // Registration the account in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: getAccessToken(),
            refresh: getRefreshToken(),
            user: res.data,
          })
        );
      });
  }

  // Login the user
  function login(data) {
    return axios.post(`${baseURL}auth/login`, data).then((res) => {
      setUserData(res.data);
      if(res.data.userDto.role === "CLIENT") {navigate("user/account")}
      if(res.data.userDto.role === "ADMIN") {navigate("admin/orders")}
    });
  }

  // Login the user
  function register(data) {
    return axios.post(`${baseURL}auth/register`, data).then((res) => {
      setUserData(res.data);
    });
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}auth/logout`, { refresh: getAccessToken() })
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/");
      });
  }
}

function useAdminActions() {
  const sendRequest = async (method, path, data) => {
    const response = await axiosService({
      method,
      url: `${baseURL}${path}`,
      data,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
    return response.data;
  };

  return {
    users: () => sendRequest('get', 'users'),
    create: (path, data) => sendRequest('post', path, data),
    update: (path, data) => sendRequest('put', path, data),
    deleteAction: (path) => sendRequest('delete', path),
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
  localStorage.setItem("auth", JSON.stringify({
      access: data.accessToken,
      refresh: data.refreshToken,
      user: data.userDto,
  }));
} 

export { useUserActions, useAdminActions, getUser, getAccessToken, getRefreshToken, setUserData };