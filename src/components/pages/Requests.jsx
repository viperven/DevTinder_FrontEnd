import React, { useEffect } from "react";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, storeRequest } from "../../utils/requestSlice";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";

function Requests() {
  const userRequests = useSelector((state) => state?.request);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const reviewRequest = async (status, id) => {
    try {
      if (!status && !id) {
        return;
      }
      const data = await DataService.reviewRequest(status, id);
      if (data?.isSuccess) {
        disPatch(removeRequest(id));
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const getRequests = async () => {
    try {
      if (userRequests && userRequests.length > 0) {
        return;
      }
      const data = await DataService.getRequestsData();
      if (data?.isSuccess) {
        disPatch(storeRequest(data?.apiData));
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
    getRequests();
  }, [reviewRequest]);

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {userRequests &&
          userRequests.map((request) => (
            <div
              key={request._id}
              className="card card-side bg-base-100 shadow-xl"
            >
              <figure className="pl-3">
                <img
                  src={request?.senderID?.photoUrl}
                  alt="profile image"
                  className="h-24 w-28 sm:h-28 sm:w-32 object-cover"
                />
              </figure>
              <div className="card-body p-2 sm:p-4">
                <h2 className="card-title text-sm sm:text-lg">
                  {request?.senderID?.firstName}
                </h2>
                <p className="text-xs sm:text-base">
                  {request?.senderID?.summary}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary text-xs sm:text-base"
                    onClick={() => {
                      reviewRequest("accepted", request?.senderID?._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger text-xs sm:text-base"
                    onClick={() => {
                      reviewRequest("ignored", request?.senderID?._id);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default Requests;
