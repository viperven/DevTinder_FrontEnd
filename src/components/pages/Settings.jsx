import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataSerivce";
import { helper } from "../helper";
import { removeUser } from "../../utils/userSlice";
import { FaWhatsapp, FaCopy } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const accountId = userData?._id;
  
  const [showModal, setShowModal] = useState(false);
  const [communicationPreferences, setCommunicationPreferences] =
    useState(false);
  const [resetPassword, setResetPassword] = useState({
    emailId: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
    step: "",
  });

  const handlePasswordChange = async () => {
    try {
      if (resetPassword.newPassword !== resetPassword.confirmPassword) {
        // setShowModal(true);
        alert("new Password ad confirm password not matched");
        return;
      }
      const parameter = {
        emailId: userData.emailId,
        newPassword: resetPassword.newPassword,
        userOtp: resetPassword.otp,
        step: "0",
      };
      const data = await DataService.updatePassword(parameter);
      if (data?.isSuccess) {
        document.getElementById("my_modal_3").showModal();
      } else {
        alert("something went wrong try again later");
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const parameter = {
        emailId: userData.emailId,
        newPassword: resetPassword.newPassword,
        userOtp: resetPassword.otp,
        step: "1",
      };
      const data = await DataService.updatePassword(parameter);
      if (data?.isSucess) {
        alert("password chnaged sucessfully");
        document.getElementById("my_modal_3").close();
      } else {
        alert("otp missmatch or expired try again");
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const data = await DataService.deleteUser();
      if (data?.isSuccess) {
        // helper.sucessAlert("User deleted successfully, Redirecting To Browser");
        alert("User deleted successfully, Redirecting To Browser");
        disPatch(removeUser());
        AuthService.logout();
        setTimeout(() => {
          navigate("/login");
        }, 300);
      } else {
        alert("Failed to delete user, Please try again");
        // helper.errorAlert("Failed to delete user, Please try again");
      }
    } catch (err) {
      alert("Failed to delete user, Please try again");
      // helper.errorAlert("Failed to delete user, Please try again");
    }
  };




  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountId);
    alert("Account ID copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const message = `🚀 Hi there! Let's connect and collaborate on exciting projects. 🔗 Use this unique ID: ${accountId} to send me a connection request. 🌐 Visit my platform here: mydevtinder.netlify.app. Looking forward to building something awesome together! ✨`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!AuthService.isAuthenticatedUser()) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <Layout>
      {
        //modal
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg">Enter Your OTP</h3>
            <p className="py-4">
              Please enter the 4-digit OTP sent to your phone.
            </p>
            <input
              type="text"
              maxLength="4"
              pattern="\d{4}"
              className="input input-bordered w-full"
              placeholder="Enter 4-digit OTP"
              onChange={(e) => {
                setResetPassword((prev) => ({
                  ...prev,
                  otp: e.target.value,
                }));
              }}
            />
            <div className="flex items-center justify-between mt-2 ">
              <p className="text-indigo-400">Otp will be valid for 2 minutes</p>
              <button type="button" className="btn" onClick={handleVerifyOtp}>
                Verify
              </button>
            </div>
          </div>
        </dialog>
      }

      <div className="flex flex-col lg:flex-row min-h-screen bg-base-200">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/6 bg-base-300 text-base">
          <div className="p-4">
            <h2 className="text-lg font-bold">Settings</h2>
          </div>
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="#profile"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#share-account"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Share Acoount
              </a>
            </li>
            <li>
              <a
                href="#update-password"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Update Password
              </a>
            </li>
            <li>
              <a
                href="#privacy-policy"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#delete-account"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Delete Account
              </a>
            </li>
            <li>
              <a
                className="block hover:bg-gray-700 p-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 p-4 md:p-8">
          {/* Profile Section */}
          <section id="profile" className="card bg-base shadow-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center space-x-4">
              <img
                src={userData?.photoUrl}
                alt="Profile"
                className="w-32 h-28 rounded-badge border"
              />
              <div>
                <h2 className="text-2xl font-bold">
                  {userData?.firstName} {userData?.lastName}
                </h2>
                <p className="text-gray-300">{userData?.summary}</p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Email: {userData?.emailId}</strong>
              </p>
              <p className="mt-2">
                <strong>Skills:</strong> {userData?.skills}
                {userData?.keySkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-secondary ml-4 text-black p-4 mt-2"
                  >
                    {skill}
                  </div>
                ))}
              </p>
            </div>
          </section>

          {/* account share section  */}
          <div className="card bg-base shadow-xl p-6 mb-6" id="share-account">
            <h2 className="text-xl font-semibold mb-4">
              Share Your Account ID
            </h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={accountId}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-800 transition duration-200"
              >
                <FaCopy />
              </button>
            </div>
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              <FaWhatsapp className="mr-2" /> Share on WhatsApp
            </button>
          </div>

          {/* Update Password Section */}
          <section
            id="update-password"
            className="card bg-base shadow-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">Update Password</h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                onChange={(e) => {
                  setResetPassword((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                onChange={(e) => {
                  setResetPassword((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={handlePasswordChange}
            >
              Update Password
            </button>
          </section>

          {/* Communication Preferences Section */}
          <section
            id="communication-preferences"
            className="card bg-base shadow-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">
              Communication Preferences
            </h2>
            <div className="form-control mb-4">
              <label className="label cursor-pointer">
                <span className="label-text">Receive Email Notifications</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={communicationPreferences}
                  onChange={() =>
                    setCommunicationPreferences(!communicationPreferences)
                  }
                />
              </label>
            </div>
            <div className="form-control mb-4">
              <label className="label cursor-pointer">
                <span className="label-text">Informational Emails</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={communicationPreferences}
                  onChange={() =>
                    setCommunicationPreferences(!communicationPreferences)
                  }
                />
              </label>
            </div>
            <div className="form-control mb-4">
              <label className="label cursor-pointer">
                <span className="label-text">Updates</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={communicationPreferences}
                  onChange={() =>
                    setCommunicationPreferences(!communicationPreferences)
                  }
                />
              </label>
            </div>
          </section>

          {/* Delete Account Section */}
          <section id="delete-account" className="card bg-base shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">Delete Account</h2>
            <p className="text-red-500 mb-4">
              Warning: Deleting your account is permanent and cannot be undone.
            </p>
            <button className="btn btn-error w-full" onClick={handleDeleteUser}>
              Delete My Account
            </button>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Settings;
