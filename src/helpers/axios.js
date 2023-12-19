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

// const refreshAuthLogic = async (failedRequest) => {
//   console.log(123)
//   return axios
//     .post(
//       "/refresh/",
//       {
//         refresh: getRefreshToken(),
//       },
//       {
//         baseURL: process.env.REACT_APP_API_URL,
//       }
//     )
//     .then((resp) => {
//       const { access } = resp.data;
//       failedRequest.response.config.headers["Authorization"] =
//         "Bearer " + access;
//       localStorage.setItem(
//         "auth",
//         JSON.stringify({ access, refresh: getRefreshToken(), user: getUser() })
//       );
//     })
//     .catch(() => {
//       localStorage.removeItem("auth");
//     });
// };

// createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

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
