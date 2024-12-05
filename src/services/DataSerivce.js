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
      },
      credentials: "include",
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
    const res = await fetch(DomainService.GetBaseUrl() + "request/review/" + status + "/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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
      },
      credentials: "include",
    });
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
  getConnectionData
};
