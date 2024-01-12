import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getRefreshToken, getUser } from "./user.actions";

const axiosService = axios.create({
  baseURL: "https://online-zoo-store-backend-web-service.onrender.com/api/v1",
});

axiosService.interceptors.request.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest) => {
  return axios
    .post("/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
    })
    .then((resp) => {
      const access = resp.data.accessToken;
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access;
      localStorage.setItem(
        "auth",
        JSON.stringify({ access, refresh: getRefreshToken(), user: getUser() })
      );
    })
    .catch(() => {
      localStorage.removeItem("auth");
    });
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

// export function fetcher(url) {
//   const auth = JSON.parse(localStorage.getItem("auth")) || null;
//   return axiosService.get(url, {
//     headers: {
//       'Authorization': "Bearer " + auth?.access
//     },
//     withCredentials: true,
//   }).then((res) => res.data);
// }

export default axiosService;
