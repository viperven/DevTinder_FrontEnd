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
  }, []);

  return (
    <Layout>
      Welcome User {homeData.firstName}
      Name : {homeData.firstName}
      Details :{homeData.summary}
    </Layout>
  );
}

export default Home;
