import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataSerivce";
import { helper } from "../helper";
import { removeUser } from "../../utils/userSlice";

const Settings = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [communicationPreferences, setCommunicationPreferences] =
    useState(false);
  const [resetPassword, setResetPassword] = useState({
    emailId: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
    step: "",
    userOtp: "",
    step: "",
  });

  const handlePasswordChange = async () => {
    try {
      if (resetPassword.newPassword === resetPassword.confirmPassword) {
        alert("new Password ad confirm password not matched");
        return;
      }

      const data = await DataService.updatePassword();
      if (data?.isSuccess) {
      }
      document.getElementById("my_modal_3").showModal();
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      debugger;
      const data = await DataService.deleteUser();
      console.log(data);

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
      // console.log(err?.message);
      alert("Failed to delete user, Please try again");
      // helper.errorAlert("Failed to delete user, Please try again");
    }
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
        <>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </div>
          </dialog>
        </>
      }

      <div className="flex min-h-screen bg-base-200">
        {/* Sidebar */}
        <aside className="w-1/6 bg-base-300 text-base">
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
              <a href="#logout" className="block hover:bg-gray-700 p-2 rounded">
                Logout
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-8">
          {/* Profile Section */}
          <section id="profile" className="card bg-base shadow-xl p-6 mb-6">
            <div className="flex items-center space-x-4">
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
                    className="badge badge-secondary ml-4 text-black p-4"
                  >
                    {skill}
                  </div>
                ))}
              </p>
            </div>
          </section>

          {/* Update Password Section */}
          <section
            id="update-password"
            className="card bg-base shadow-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">Update Password</h2>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  onChange={(e) => {
                    resetPassword((prev) => ({
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
                    resetPassword((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }));
                  }}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
            </form>
          </section>

          {/* Communication Preferences Section */}
          <section
            id="communication-preferences"
            className="card bg-base shadow-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">
              Communication Preferences
            </h2>
            <div className="form-control">
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
            <div className="form-control">
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
            <div className="form-control">
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
            <button className="btn btn-error" onClick={handleDeleteUser}>
              Delete My Account
            </button>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Settings;
