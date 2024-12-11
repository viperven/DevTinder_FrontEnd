import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { storeFeed, removeFeed } from "../../utils/feedSlice";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import Layout from "../layout/Layout";
import { Heart, X } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  const [feedData, setFeedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(feedData.length - 1); // Reset index when feedData changes
  }, [feedData]);

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


  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
    initProfileData();
  }, []);    
  
  
  
  const handleDirectRequest = async (id) => {
    const data = await DataService.sendRequest("interested", receiverId);
    if (data?.isSuccess) {
      alert("request sent successfully");
      setReceiverId("");
      initProfileData(true);
    }
  }; 

  const swipe = (dir) => {
    if (currentIndex < 0) return;
    setDirection(dir);

    setTimeout(() => {
      const newFeed = [...feedData];
      newFeed.splice(currentIndex, 1); // Remove current card
      setFeedData(newFeed);
    }, 300); // Match animation duration
  };

  return (
    <Layout>
      <div className="mt-16 flex flex-col items-center p-5">
        <AnimatePresence>
          {currentIndex >= 0 && (
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <img
                src={feedData[currentIndex]?.photoUrl}
                alt={feedData[currentIndex]?.firstName}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {feedData[currentIndex]?.firstName}
                </h3>
                <p>{feedData[currentIndex]?.summary || ""}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {feedData[currentIndex]?.keySkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swipe(-1)} // Pass
            className="p-4 rounded-full bg-white shadow-lg"
          >
            <X className="w-8 h-8 text-rose-500" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swipe(1)} // Like
            className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.button>
        </div>

        <div className="mt-4 p-4 bg-base shadow-lg rounded-xl border border-gray-300">
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
