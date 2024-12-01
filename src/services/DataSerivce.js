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

export const DataService = {
  getFeedData,
};
