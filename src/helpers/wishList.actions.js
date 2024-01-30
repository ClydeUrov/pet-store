import axios from "axios";
import { getAccessToken } from "./user.actions";
import { useEffect, useState } from "react";

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

// wishList.actions.js:31 
// DELETE https://online-zoo-store-backend-web-service.onrender.com/api/v1/wish-lists/items 401 (Unauthorized)
function clearAllWishList() {
  return axios.delete(`${baseURL}wish-lists/items/all`, {
    headers: { Authorization: "Bearer " + getAccessToken() },
  });
}

function refillWishList(items) {
  return axios.put(`${baseURL}wish-lists/items/refill`, items, {
    headers: { Authorization: "Bearer " + getAccessToken() },
  });
}

function useFetchWishList(fetcher, items) {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  let isMounted = true;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async (fetcher, items) => {
      try {
        const response = await fetcher(source.token, items);
        setData(response.data);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
        setData([]);
      }
    };
    if (isMounted) fetchData(fetcher, items);

    const cleanUp = () => {
      source.cancel();
      isMounted = false;
    };

    return cleanUp;
  }, [fetcher, items]);

  return { data, fetchError };
}

export default useFetchWishList;

export {
  getWishList,
  postItemInWishList,
  clearAllWishList,
  deleteOneItemWishList,
  refillWishList,
};
