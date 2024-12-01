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

const sendRequest = async (action, id) => {
  if (!["interested", "rejected"].includes(action)) {
    return;
  }
  try {
    const res = await fetch(
      DomainService.GetBaseUrl() + "request/send/" + action + "/" + id,
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

export const DataService = {
  getFeedData,
  sendRequest,
};
