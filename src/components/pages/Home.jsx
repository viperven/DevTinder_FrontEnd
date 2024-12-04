import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CookieService from "../../services/CookieService";
import { AuthService } from "../../services/AuthService";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { DataService } from "../../services/DataSerivce";

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState("");

  // const initHomeData = async () => {
  //   try {
  //     debugger
  //     if (user.length > 0) {
  //       setHomeData(user);
  //       return;
  //     }
  //     const data = await DataService.getProfileData();
  //     console.log(data);

  //     if (data?.isSuccess) {
  //       setHomeData(data?.apiData);
  //       dispatch(addUser(data?.apiData));
  //     }
  //   } catch (error) {
  //     // console.error(error);
  //   }
  // };

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
    // initHomeData();
    // if (!AuthService.isAuthenticatedUser()) {
    //   navigate("/login");
    //   return;
    // }
    initHomeData();
  }, []);

  return (
    <Layout>
      <div className="relative h-screen">
  <img 
    src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp" 
    className="w-full h-full object-cover opacity-50" 
    alt="Background" 
  />
  {/* Overlay gradient */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-gray-700 opacity-20"></div>
  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-6xl">
    <div className="text-white font-extrabold p-4 text-7xl animate__animated animate__fadeIn animate__delay-1s">
      {/* <h1 className="text-7xl">
        Welcome User {homeData.firstName}
      </h1> */}
      {/* <p className="text-xl mt-4 animate__animated animate__fadeIn animate__delay-2s">
        Name: {homeData.firstName}
      </p>
      <p className="text-lg mt-2 animate__animated animate__fadeIn animate__delay-3s">
        Details: {homeData.summary}
      </p> */}
      <h1 class="font-extrabold text-9xl">Welcome to DevTinder</h1>
    </div>
  </div>
</div>





    </Layout>
  );
}

export default Home;
