import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { DataService } from "../../services/DataSerivce";
import { addUser } from "../../utils/userSlice";

function Hearder() {
  const [userSelectedTheme, setUserSelectedTheme] = useState("");
  const [headerData, setHeaderData] = useState("");
  const user = useSelector((state) => state.user);
  const disPatch = useDispatch();

  const initHeaderData = async () => {
    try {
      if (user && typeof user === "object" && user?._id) {
        setHeaderData(user);
        return;
      }
      const data = await DataService.getProfileData();
      if (data?.isSuccess) {
        setHeaderData(data?.apiData);
        disPatch(addUser(data?.apiData));
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
  };

  const handleToggle = (e) => {
    const buttonChecked = e.target.checked;
    const userTheme = buttonChecked ? "winter" : "dracula";
    setUserSelectedTheme(userTheme);
    localStorage.setItem("theme", userTheme);
  };

  const initSetTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "winter") {
      setUserSelectedTheme("winter");
      document.getElementById("themeInput").checked = true;
    }
  };

  useEffect(() => {
    initHeaderData();
    initSetTheme();
  }, []);

  return (
    <div
      className="navbar bg-base-200 border-b-4 border-cyan-50"
      style={{ borderRadius: "6px" }}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <label className="flex cursor-pointer gap-2 pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <label className="flex cursor-pointer gap-2">
          <input
            id="themeInput"
            type="checkbox"
            value={userSelectedTheme}
            className="toggle theme-controller"
            onClick={handleToggle}
          />
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <h3>{headerData?.firstName}</h3>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={headerData?.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </NavLink>
            </li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/requests">Requests</NavLink>
            <NavLink to="/login" onClick={handleLogout}>
              Logout
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hearder;
      