import { AuthService } from "./AuthService";
import { DomainService } from "./DomianService";

const getFeedData = async (pageSize = null, pageIndex = null) => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() +
      "user/feed?" +
      "pageSize=" +
      pageSize +
      "pageIndex=" +
      pageIndex,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getProfileData = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "profile/view", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const editProfileData = async (form) => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "profile/edit", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getRequestsData = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "user/received", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to send request to user intrested or rejected
const sendRequest = async (status, id) => {
  if (!["interested", "rejected"].includes(status)) {
    return;
  }
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() + "request/send/" + status + "/" + id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to view user request to accept or ignore
const reviewRequest = async (status, id) => {
  try {
    if (!["accepted", "ignored"].includes(status)) {
      return;
    }
    const res = await fetch(
      DomainService.GetBaseUrl() + "request/review/" + status + "/" + id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to fetch user connection
const getConnectionData = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "user/connections", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//to fetch user ignore List
const getIgnoreData = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "user/ignore", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//send delete otp
const sendDeleteOtp = async () => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "auth/sendDeleteOtp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//delete user
const deleteUser = async (formData) => {
  try {
    if (!formData?.userOtp) {
      return "otp can not be null";

    }
    const res = await fetch(DomainService.GetBaseUrl() + "auth/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
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

//delete user
const updatePassword = async (formData) => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() + "auth/updatePassword",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",

        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//GET Last of all connection
const getConnectionsLastMessage = async () => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() + "message/conversations",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

//GET all message by conversation id
const getAllMessageByConversationId = async (conversationId) => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() +
      "message/allMessage?conversationID=" +
      conversationId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendMessage = async (formData) => {
  try {
    const res = await fetch(DomainService.GetBaseUrl() + "message/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: AuthService.getApiAuthorizationConfig(),
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

//GET all message by user id
const getAllMessageByUserId = async (receiverId) => {
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() +
      "message/messageById?receiverId=" +
      receiverId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthService.getApiAuthorizationConfig(),
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const DataService = {
  getFeedData,
  sendRequest,
  getProfileData,
  getRequestsData,
  reviewRequest,
  getConnectionData,
  getIgnoreData,
  sendDeleteOtp,
  deleteUser,
  updatePassword,
  getConnectionsLastMessage,
  getAllMessageByConversationId,
  sendMessage,
  getAllMessageByUserId,
  editProfileData,
};
