/* eslint-disable camelcase */
import { jwtDecode } from "jwt-decode";

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const getDecodedJwt = () => {
  try {
    const token = getToken();
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Failed to decode JWT:", error);
    }
    return null;
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const logOut = () => {
  removeToken();
  window.location.replace("/");
};

const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt();

    if (!decodedToken) return false;

    const { exp } = decodedToken as { exp: number };
    if (!exp) return false;

    const currentTime = Date.now() / 1000;
    return exp > currentTime;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Failed to check authentication:", error);
    }
    return false;
  }
};

const Auth = {
  isAuthenticated,
  getDecodedJwt,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  removeToken,
  logOut,
};

export default Auth;
