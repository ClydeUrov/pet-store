import axios from 'axios';

//axios.defaults.baseURL = 'https://online-zoo-store-backend-web-service.onrender.com/';


  export const fetchAllCategories = async () => {
  return await axios
  .get(`/api/v1/product-categories`)
  .then(response => response.data)
  .catch(err => console.log(err));
}

  export const fetchMainCategories = async () => {
  return await axios
  .get(`/api/v1/product-categories/main`)
  .then(response => response.data)
  .catch(err => console.log(err));
}

export const fetchImgFromOneCategory = async categoryId => {
    try {
      const response = await axios.get(`api/v1/product-categories/${categoryId}/image`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

// export const fetchProductsFromOneCategory = async categoryId => {
//     try {
//       const response = await axios.get(`api/v1/products?categoryId=${categoryId}`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

// export const fetchAllProducts = async () => {
//     try {
//       const response = await axios.get(`api/v1/products`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

export const fetchInnerCategoriesFromMainCategory = async categoryId => {
    try {
      const response = await axios.get(`api/v1/product-categories/${categoryId}/inner-categories`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchIndicators = async indicator => {
    try {
      const response = await axios.get(`api/v1/${indicator}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

// `api/v1/weights`
// `api/v1/product-sizes`
// `api/v1/prescriptions`
// `api/v1/materials`
// `api/v1/colors`
// `api/v1/brands`
// `api/v1/ages`


export const fetchProductById = async productId => {
  try {
    const response = await axios.get(`api/v1/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


//товары категории
//https://online-zoo-store-backend-web-service.onrender.com/api/v1/products?categoryId=4  !!

// все товары 
//https://online-zoo-store-backend-web-service.onrender.com/api/v1/products !!

//https://online-zoo-store-backend-web-service.onrender.com/api/v1/product-categories/3/inner-categories !!

//https://online-zoo-store-backend-web-service.onrender.com/api/v1/product-categories/3/products

