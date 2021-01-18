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
    Axios.put(`${url}/id`)
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
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      await Axios.post(url, data);
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
