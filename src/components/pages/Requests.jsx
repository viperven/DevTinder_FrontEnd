import React, { useEffect } from "react";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { storeRequest } from "../../utils/requestSlice";
import Layout from "../layout/Layout";

function Requests() {
  const userRequests = useSelector((state) => state?.request);
  const disPatch = useDispatch();

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

  console.log(userRequests);

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
    getRequests();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 p-8">
        {userRequests &&
          userRequests.map((request) => (
            <div
              key={request._id}
              className="card card-side bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={request?.senderID?.photoUrl}
                  alt="profile image"
                  className="h-28 w-32"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{request?.senderID?.firstName}</h2>
                <p>{request?.senderID?.summary}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-danger">Decline</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default Requests;
