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

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <Layout>
      Welcome User {user.firstName}
      Name : {user.firstName}
      Details :{user.summary}
    </Layout>
  );
}

export default Home;
