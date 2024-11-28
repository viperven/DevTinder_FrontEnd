import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <>
      Welcome User {user.firstName}
      Name : {user.firstName}
      Details :{user.summary}
    </>
  );
}

export default Home;
