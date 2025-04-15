import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { storeFeed, removeFeed } from "../../utils/feedSlice";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import Layout from "../layout/Layout";
import { Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Feed() {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  const [feedData, setFeedData] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [cardDirection, setCardDirection] = useState(0);
  const navigate = useNavigate();
  const initProfileData = async (forceReload = false) => {
    try {
      if (!forceReload && userFeed.length > 0) {
        setFeedData(userFeed);
        return;
      }
      const data = await DataService.getFeedData();
      if (data?.isSuccess) {
        setFeedData(data?.apiData);
        dispatch(storeFeed(data?.apiData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDirectRequest = async () => {
    const data = await DataService.sendRequest("interested", receiverId);
    if (data?.isSuccess) {
      alert("Request sent successfully");
      setReceiverId("");
      initProfileData(true);
    }
  };

  const swipe = async (direction, id) => {
    const action = direction === "right" ? "interested" : "rejected";
    const data = await DataService.sendRequest(action, id);
    if (data?.isSuccess) {
      const removeCard = feedData.filter((curElm) => curElm._id !== id);
      setCardDirection(direction === "right" ? 1 : -1);
      setFeedData(removeCard);
      dispatch(removeFeed(id));
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
    <Layout>
      <div className="relative w-full min-h-screen mt-10 flex flex-col items-center p-5">
        {feedData.length > 0 ? (
          <div className="relative w-full max-w-md w-[25rem] h-[35rem]">
            <AnimatePresence>
              {feedData.map((card, index) => (
                <motion.div
                  key={card._id}
                  initial={{ x: cardDirection * 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -cardDirection * 300, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-0 left-0 w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-white ${
                    index === feedData.length - 1 ? "z-10" : "z-0"
                  }`}
                >
                  <img
                    src={card.photoUrl}
                    alt={card.firstName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                    <h3 className="text-2xl font-bold">{card.firstName}</h3>
                    <p>{card.summary || ""}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.keySkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold text-gray-700">
              No feed data available.
            </h2>
            <p className="text-gray-500 mt-2">
              Please check back later or refresh the page.
            </p>
          </div>
        )}

        {feedData.length > 0 && (
          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => swipe("left", feedData[feedData.length - 1]?._id)} // Pass
              className="p-4 rounded-full bg-white shadow-lg"
            >
              <X className="w-8 h-8 text-rose-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => swipe("right", feedData[feedData.length - 1]?._id)} // Like
              className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.button>
          </div>
        )}

        <div className="w-full lg:w-auto lg:absolute lg:top-16 lg:right-10 p-4 bg-base shadow-lg rounded-xl border border-gray-300 mt-8 lg:mt-0">
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
      </div>
    </Layout>
  );
}

export default Feed;
