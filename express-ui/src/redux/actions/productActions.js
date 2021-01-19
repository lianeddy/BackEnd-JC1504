import Axios from "axios";
import { api_url } from "../../helpers";
import {
  API_PRODUCT_FAILED,
  API_PRODUCT_SUCCESS,
  API_PRODUCT_START,
  API_PRODUCT_FILL,
  NULLIFY_ERROR,
} from "../types";

const url = `${api_url}/products`;

export const fetchProductsAction = () => {
  // Async
  return async (dispatch) => {
    // Await
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const res = await Axios.get(url);
      dispatch({
        type: API_PRODUCT_FILL,
        payload: res.data,
      });
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }

    //Promise
    // Axios.get(url)
    //   .then((res) => {
    //     dispatch({
    //       type: API_PRODUCT_FILL,
    //       payload: res.data,
    //     });
    //     dispatch({
    //       type: API_PRODUCT_SUCCESS,
    //     });
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: API_PRODUCT_FAILED,
    //       payload: err.message,
    //     });
    //   });
  };
};

export const deleteProductsAction = (id) => {
  return (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    Axios.delete(`${url}/${id}`)
      .then((res) => {
        dispatch(fetchProductsAction());
        dispatch({
          type: API_PRODUCT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: API_PRODUCT_FAILED,
          payload: err.message,
        });
      });
  };
};

export const addProductAction = (data) => {
  return async (dispatch) => {
    const { nama, caption, stock, image, harga } = data;
    // Karena yang kita kirim ke API adalah sebuah file
    // Kita pakai formdata (WAJIB)
    let formData = new FormData();
    // Karena formdata tidak bisa append object
    // Maka kita pakai stringify untuk mengubah object tersebut menjadi string panjang (85)
    const value = JSON.stringify({ nama, caption, stock, harga });
    formData.append("image", image.imageFile);
    formData.append("data", value);
    // for (let key of formData) {
    //   console.log(key);
    // }
    // formData.append("nama", nama);
    // formData.append("caption", caption);
    // formData.append("stock", stock);
    // formData.append("harga", harga);
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      // Memberi tahu kepada api bahwa kita mengirim file dalam bentuk formdata (102)
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      // argumen axios
      // axios(alamat api, data yang dikirim, header)
      await Axios.post(url, formData, headers);
      dispatch(fetchProductsAction());
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }

    //   try {
    //     await Axios.post(url, data);
    //     dispatch(fetchProductsAction());
    //     dispatch({
    //       type: API_PRODUCT_SUCCESS,
    //     });
    //   } catch (err) {
    //     dispatch({
    //       type: API_PRODUCT_FAILED,
    //       payload: err.message,
    //     });
    //   }
  };
};

export const editProductsAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      await Axios.patch(`${url}/${data.id}`, data);
      dispatch(fetchProductsAction());
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const nullifyErrorAction = () => {
  return {
    type: NULLIFY_ERROR,
  };
};
