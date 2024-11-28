const baseUrlDevlopment = "http://localhost:4000/";

const baseUrlLive = "";

const GetBaseUrl = () => {
  return baseUrlDevlopment;
};

export const DomainService = {
  GetBaseUrl,
};
