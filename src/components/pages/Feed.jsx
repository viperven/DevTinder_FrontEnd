import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataSerivce";
import { useDispatch, useSelector } from "react-redux";
import { storeFeed, removeFeed } from "../../utils/feedSlice";
import { AuthService } from "../../services/AuthService";

function feed() {
  const disPatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  const [feedData, setFeedData] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  const onSwipe = async (direction, name, id) => {
    const action = direction === "right" ? "interested" : "rejected";
    const data = await DataService.sendRequest(action, id);
    if (data?.isSuccess) {
      const removeCard = feedData.filter((curElm) => curElm._id !== id);
      setFeedData(removeCard);
      disPatch(removeFeed(id));
    }
  };

  const handleDirectRequest = async (id) => {
    const data = await DataService.sendRequest("interested", receiverId);
    if (data?.isSuccess) {
      alert("request sent successfully");
      setReceiverId("");
      initProfileData(true);
    }
  };

  const initProfileData = async (forceReload = false) => {
    try {
      debugger;
      if (!forceReload && userFeed.length > 0) {
        setFeedData(userFeed);
        return;
      }
      const data = await DataService.getFeedData();
      if (data?.isSuccess) {
        setFeedData(data?.apiData);
        disPatch(storeFeed(data?.apiData));
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
    initProfileData();
  }, []);

  return (
    <>
      <Layout>
        <div className="absolute lg:top-32 top-[55rem]  right-20 p-4 bg-base shadow-lg rounded-xl border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Send Direct Request</h2>
          <input
            type="text"
            placeholder="Enter receiver ID"
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={handleDirectRequest}
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
          >
            Send Request
          </button>
        </div>
        <div className="flex items-center justify-center h-[80vh]">
          <div
            className="relative w-[90%] max-w-[350px] h-[60vh] mx-auto"
            style={{ top: "-10%" }}
          >
            {feedData.map((card, index) => (
              <TinderCard
                key={card._id}
                onSwipe={(dir) => onSwipe(dir, card?.firstName, card?._id)}
                className="absolute w-full h-full"
              >
                <div className="card bg-base-100 w-full h-full shadow-xl">
                  <figure>
                    <img
                      src={card?.photoUrl}
                      alt="user image"
                      className="object-cover h-full w-full"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {card?.firstName}
                      {card?.keySkills.map((skill, index) => (
                        <div key={index} className="badge badge-secondary">
                          {skill}
                        </div>
                      ))}
                    </h2>
                    <p>{card?.summary || ""}</p>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() =>
                          onSwipe("right", card?.firstName, card?._id)
                        }
                        className="badge badge-outline bg-pink-600 text-lg p-4 hover:bg-sky-500"
                      >
                        Like
                      </button>
                      <button
                        onClick={() =>
                          onSwipe("left", card?.firstName, card?._id)
                        }
                        className="badge badge-outline text-lg p-4 hover:bg-sky-500"
                      >
                        Pass
                      </button>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default feed;
