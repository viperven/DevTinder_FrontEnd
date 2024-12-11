import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { DataService } from "../../services/DataSerivce";
import { addUser } from "../../utils/userSlice";
// import { setTheme } from "../../utils/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../../utils/themeSlice";


function Hearder() {
  const [userSelectedTheme, setUserSelectedTheme] = useState("");
  const [headerData, setHeaderData] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user);
  

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
    // useDispatch(setTheme(userTheme));
    dispatch(themeSelector(!themeSelect));
  };


  const themeSelect = useSelector((store) => store.theme.themes);
  console.log("🚀 ~ Hearder ~ themeSelect:", themeSelect)
  const dispatch = useDispatch();


  const initSetTheme = () => {
    const theme = localStorage.getItem("theme");
    // if (theme && theme === "winter") {
    //   setUserSelectedTheme("winter");
    //   document.getElementById("themeInput").checked = true;
    // }
  };

  const checkUserLoggedIn = () => {
    const check = AuthService.isAuthenticatedUser();
    setShowMenu(check);
  };

  useEffect(() => {
    checkUserLoggedIn();
    initHeaderData();
    initSetTheme();
  }, []);

  const textColorClass = themeSelect == true ? "text-zinc-900" : "text-white";

  return (
    <div
      className={`navbar bg-black border-b-4${textColorClass}`}
     
    >
      <div className="flex-1">
      {/* <img
                className="w-30 h-10 ml-20"
                src="https://www.logo.wine/a/logo/Tinder_(app)/Tinder_(app)-Flame-Logo.wine.svg"
              /> */}
        <a className="btn btn-ghost text-xl">DevTinder</a>
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
      {showMenu && showMenu ? (
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
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
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
              <NavLink to="/connection">Connections</NavLink>
              <NavLink to="/ignore">Ignore</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <NavLink to="/chat">Chat</NavLink>
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </ul>
          </div>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={`cursor-pointer px-4 py-2 bg-base-100 rounded hover:bg-base-300 transition duration-300 ${textColorClass}`}
        >
          Login
        </NavLink>
      )}
    </div>
  );
}

export default Hearder;
