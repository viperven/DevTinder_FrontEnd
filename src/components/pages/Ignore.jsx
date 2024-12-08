import React, { useEffect } from "react";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { storeIgnoreList } from "../../utils/ignoreSlice";

function Ignore() {
  const userIgnoreList = useSelector((state) => state?.ignore);
  const loggedInUserId = useSelector((state) => state.user._id);

  const disPatch = useDispatch();
  const navigate = useNavigate();

  const getIgnoreData = async () => {
    try {
      if (userIgnoreList && userIgnoreList.length > 0) {
        return;
      }
      const data = await DataService.getIgnoreData();
      if (data?.isSuccess) {
        disPatch(storeIgnoreList(data?.apiData));
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
    getIgnoreData();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {userIgnoreList &&
          userIgnoreList.map((connection) => {
            // Determine the other user's details
            const otherUser =
              connection.senderID._id === loggedInUserId
                ? connection.receiverID
                : connection.senderID;

            return (
              <div
                key={connection._id}
                className="card card-side bg-base-100 shadow-xl"
              >
                <figure className="pl-3">
                  <img
                    src={otherUser.photoUrl}
                    alt="profile image"
                    className="h-28 w-32 sm:h-28 sm:w-32 object-cover"
                  />
                </figure>
                <div className="card-body p-2 sm:p-4">
                  <h2 className="card-title text-sm sm:text-lg">
                    {otherUser.firstName}
                  </h2>
                  <p>{otherUser.summary}</p>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export default Ignore;
