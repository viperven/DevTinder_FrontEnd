import { DomainService } from "./DomianService";
const baseUrl = DomainService.GetBaseUrl() + "auth";
import CookieService from "./CookieService";
import { jwtDecode } from "jwt-decode";

const loginUser = async (formData) => {
  try {
    const res = await fetch(baseUrl + "/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const register = async (formData) => {
  try {
    const res = await fetch(baseUrl + "/signup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const validateToken = () => {
  try {
    const token = CookieService.getCookie("auth-token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return true;
      } else {
        CookieService.clearCookie("auth-token");
      }
      return false;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const isAuthenticatedUser = () => {
  try {
    if (validateToken()) {
      return true;
    }
    CookieService.clearCookie();
    return false;
  } catch (error) {
    console.error("Error:", error);
  }
};

const logout = () => {
  CookieService.clearCookie("auth-token");
};

export const AuthService = {
  loginUser,
  validateToken,
  isAuthenticatedUser,
  logout,
  register,
};
