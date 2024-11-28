import { DomainService } from "./DomianService";
const baseUrl = DomainService.GetBaseUrl() + "auth";

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

export const AuthService = {
  loginUser,
};
