import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import Layout from "../layout/Layout";
import { DataService } from "../../services/DataSerivce";
import { useDispatch, useSelector } from "react-redux";
import { storeFeed, removeFeed } from "../../utils/feedSlice";

import img1 from "../../assets/images/car.png";
import img2 from "../../assets/images/bullet_train.png";

function feed() {
  const [feedData, setFeedData] = useState([]);
  const userFeed = useSelector((state) => state.feed);
  const disPatch = useDispatch();

  console.log(feedData);
  console.log(userFeed, "kkl");

  const onSwipe = async (direction, name, id) => {
    console.log(`You swiped ${direction} on ${name} and id ${id}`);
    const action = direction === "right" ? "interested" : "rejected";
    const data = await DataService.sendRequest(action, id);
    if (data?.isSuccess) {
      const removeCard = api.filter((curElm) => curElm._id !== id);
      setFeedData(removeCard);
      disPatch(removeFeed(id));
    }
  };

  const onCardLeftScreen = (name) => {
    console.log(`${name} left the screen`);
    setFeedData((prev) => prev.slice(0, -1)); // Remove the last card
  };

  const initProfileData = async () => {
    try {
      if (userFeed.length > 0) {
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
    initProfileData();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center">
          <div className="relative w-[350px] h-[400px]">
            {feedData.map((card, index) => (
              <TinderCard
                key={card._id}
                onSwipe={(dir) => onSwipe(dir, card?.firstName, card?._id)}
                onCardLeftScreen={() => onCardLeftScreen(card.firstName)}
                className="absolute w-full h-full"
              >
                <div className="card bg-base-100 w-96 shadow-xl">
                  <figure>
                    <img src={card?.photoUrl} alt="user image" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {card?.firstName}
                      {card?.keySkills.map((skill, index) => (
                        <div className="badge badge-secondary">{skill}</div>
                      ))}
                    </h2>
                    <p>{card?.summary || ""}</p>
                    <div className="card-actions justify-end">
                      <button className=" badge badge-outline bg-pink-600 text-lg p-4 hover:bg-sky-500 ">
                        Like
                      </button>
                      <button className=" badge badge-outline text-lg p-4 hover:bg-sky-500 ">
                        pass
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
