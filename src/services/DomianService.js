const baseUrlDevlopment = "http://localhost:4000/";

const baseUrlDev =
  "https://ia10swmere.execute-api.ap-south-1.amazonaws.com/dev/";

const baseUrlLive =
  "https://ia10swmere.execute-api.ap-south-1.amazonaws.com/prod/";

const GetBaseUrl = () => {
  return baseUrlDevlopment;
};

export const DomainService = {
  GetBaseUrl,
};
 