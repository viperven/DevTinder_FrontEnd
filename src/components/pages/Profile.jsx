import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { DataService } from "../../services/DataSerivce";
import { addUser } from "../../utils/userSlice";
import Layout from "../layout/Layout";

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");
  const dispatch = useDispatch();

  const initProfileData = async () => {
    try {
      if (user.length > 0) {
        setFeedData(user);
        return;
      }
      const data = await DataService.getProfileData();
      if (data?.isSuccess) {
        setProfileData(data?.apiData);
        dispatch(addUser(data?.apiData));
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    // if (!AuthService.isAuthenticatedUser()) {
    //   navigate("/login");
    //   return;
    // }
    initProfileData();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center w-full min-h-screen bg-base from-blue-50 via-white to-blue-50 gap-8  flex-wrap">
          <div className="card w-full h-[700px] max-w-md bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold text-blue-600 mb-6">
                Update Profile
              </h2>
              <form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input
                    value={profileData.firstName}
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input
                    value={profileData.lastName || ""}
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Key Skills</span>
                  </label>
                  <input
                    value={profileData.keySkills}
                    type="text"
                    placeholder="Enter your key skills"
                    className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Summary</span>
                  </label>
                  <textarea
                    value={profileData.summary}
                    placeholder="Enter your summary"
                    className="textarea textarea-bordered focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Change Profile
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Enter your key skills"
                    className="nput input-bordered input-primary focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full text-lg font-semibold">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Display Section */}
          <div className="card w-full h-[700px] max-w-md bg-base-100 shadow-xl border border-gray-200">
            <figure>
              <img
                src={
                  profileData?.photoUrl || "https://via.placeholder.com/400x300"
                }
                alt="user"
                className="w-full h-96 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-bold text-gray-800">
                {profileData?.firstName} {profileData?.lastName}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData?.keySkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-secondary text-black p-4"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-4 text-white">
                {profileData?.summary || ""}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
