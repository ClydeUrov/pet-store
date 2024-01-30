import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { UserLoginLogoutPublish, smthInWishList } from "./events/LoginLogout";
import { CartAddEventPublish } from "./events/CartEvent";
import { getWishListLS, setWishListLS } from "./wishListLS";
import { clearAllWishList, refillWishList } from "./wishList.actions";

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
    postCarts,
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
      if (res.data.user.role === "CLIENT")
        setWishList(res.data.wishList.products);
      UserLoginLogoutPublish("UserLogin");
      if (res.data.user.role === "CLIENT") {
        navigate("user/account");
      }
      if (res.data.user.role === "ADMIN") {
        navigate("admin/orders");
      }
    });
  }

  // Login the user
  function register(data, path) {
    return axios.post(`${baseURL}auth/register?path=${path}`, data);
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}auth/logout`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then(async () => {
        if (getUser().role === "CLIENT") await updateWishListAPI();
      })
      .then(() => {
        CartAddEventPublish({ action: "exit", id: [] });
        localStorage.removeItem("auth");
        localStorage.removeItem("wishList");
        localStorage.removeItem("cart");
        localStorage.removeItem("constants");
        UserLoginLogoutPublish("UserLogout");
        navigate("/");
      });
  }

  async function getCarts() {
    return await axiosService
      .get(`${baseURL}carts`, {
        headers: { Authorization: "Bearer " + getAccessToken() },
      })
      .then((resp) => resp.data);
  }

  async function postCarts(data) {
    return await axiosService
      .post(`${baseURL}carts/items`, data, {
        headers: { Authorization: "Bearer " + getAccessToken() },
      })
      .then((resp) => resp.data);
  }

  function deleteCart(itemId) {
    return axiosService.delete(`${baseURL}carts/items/${itemId}`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
    });
  }

  function deleteAllCarts() {
    return axiosService.delete(`${baseURL}carts/items`, {
      headers: { Authorization: "Bearer " + getAccessToken() },
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

function setWishList(APIList) {
  const LSList = getWishListLS();
  const ids = [];
  const uniqueArr = [];
  LSList.concat(APIList).forEach((el) => {
    if (!ids.includes(el.id)) {
      ids.push(el.id);
      uniqueArr.push(el);
    }
  });
  if (uniqueArr.length) smthInWishList();
  setWishListLS(uniqueArr);
}

async function updateWishListAPI() {
  const LSList = getWishListLS().map((el) => el.id);

  if (!LSList.length) {
    // something going wrong!
    // await clearAllWishList();
  } else {
    await refillWishList(LSList);
  }
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.accessToken,
      refresh: data.refreshToken,
      user: data.user,
    })
  );

  if (data.cart.items.length > 0) {
    let carts = [];
    let ids = [];
    const localProducts = JSON.parse(localStorage.getItem("cart")) || [];

    data.cart.items.forEach((item) => {
      const productData = {
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          ...(item.product.priceWithDiscount && {
            priceWithDiscount: item.product.priceWithDiscount,
          }),
          mainImage: { filePath: item.product.mainImage.filePath },
        },
        quantity: item.quantity,
      };
      carts.push(productData);
      ids.push(item.product.id);
    });

    const additionalProducts = localProducts.filter(
      (item) => !ids.includes(item.product.id)
    );
    carts = carts.concat(additionalProducts);

    localStorage.setItem("cart", JSON.stringify(carts));
    CartAddEventPublish({ action: "+", id: ids });
  }
}

export {
  useUserActions,
  useAdminActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
