const baseUrlDevlopment = "http://localhost:5000/";

const ec2Url = "http://65.2.40.170:5000/"

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
