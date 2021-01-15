import {
  API_PRODUCT_FAILED,
  API_PRODUCT_FILL,
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  NULLIFY_ERROR,
} from "../types";

const INITIAL_STATE = {
  productList: [],
  loading: false,
  error: "",
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case API_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case API_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case API_PRODUCT_FILL:
      return {
        ...state,
        productList: action.payload,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
