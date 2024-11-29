import { jwtDecode } from "jwt-decode";

const decodeCookie = (token) => {
  try {
    const cookie = jwtDecode(decoded);
  } catch (err) {
    console.log(err?.message);
  }
};

const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const clearCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export default {
  decodeCookie,
  getCookie,
  clearCookie,
};
