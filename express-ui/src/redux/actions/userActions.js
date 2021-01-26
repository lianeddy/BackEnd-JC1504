import Axios from "axios";
import { api_url } from "../../helpers";
import {
  API_USER_START,
  API_USER_SUCCESS,
  API_USER_FAILED,
  LOGIN,
  LOGOUT,
} from "../types";

const url = api_url + "/users";

export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/login`, data);
      const {
        id,
        username,
        email,
        alamat,
        roleID,
        verified,
        token,
      } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const registerAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/register`, data);
      const {
        id,
        username,
        email,
        alamat,
        roleID,
        verified,
        token,
      } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT,
    });
  };
};

export const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await Axios.post(`${url}/keep-login`, {}, headers);
      const { id, username, email, alamat, roleID, verified } = response.data;
      dispatch({
        type: LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const emailVerificationAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/email-verification`, data);
      const {
        id,
        username,
        email,
        alamat,
        roleID,
        verified,
        token,
      } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const sendEmailChangeAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      await Axios.post(`${url}/change-email`, data);
      alert(`Email ganti password telah dikirim ke ${data.email}`);
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const changePassAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    const headers = {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    try {
      await Axios.post(
        `${url}/change-pass`,
        { password: data.password },
        headers
      );
      alert("Password anda berhasil diganti");
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};
