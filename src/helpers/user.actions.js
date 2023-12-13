import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";

function useUserActions() {
  const navigate = useNavigate();
  // const baseURL = process.env.REACT_APP_API_URL;
  const baseURL = "https://online-zoo-store-backend-web-service.onrender.com/api/v1/";

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
    return axios.get(`https://online-zoo-store-backend-web-service.onrender.com/api/v1/users/profile`, {
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
      // Registering the account and tokens in the store
      console.log(222, res)
      setUserData(res.data);
      navigate("user/account");
    });
  }

  // Login the user
  function register(data) {
    return axios.post(`${baseURL}auth/register`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate("/main/");
    });
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}auth/logout`, { refresh: getRefreshToken() })
      .then(() => {
        localStorage.removeItem("auth");
        navigate("login/");
      });
  }
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
  console.log(333, data)
  localStorage.setItem("auth", JSON.stringify({
      access: data.accessToken,
      refresh: data.refreshToken,
      user: data.user,
  }));
} 

export { useUserActions, getUser,  getAccessToken, getRefreshToken, setUserData };