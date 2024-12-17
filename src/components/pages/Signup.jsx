import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CookieService from "../../services/CookieService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userOtp: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookieName = "token";
  const cookieExpairy = 1;


  const handleOtpSend = async (e) => {
    try {
      e.preventDefault();
      const isOtpSended = await AuthService.sendOtp({ emailID: formData?.email });
      if (isOtpSended?.isSuccess) {
        document.getElementById("signupModal").showModal();
      }
      else {
        alert(isOtpSended?.message);
      }
    }
    catch (err) {
      alert(isOtpSended?.message);
      console.log(err?.message);

    }
  }

  const handleSignup = async () => {
    try {
      const data = await AuthService.register(formData);
      if (data?.isSuccess) {
        CookieService.setCookie(cookieName, data?.token, cookieExpairy);
        dispatch(addUser(data?.apiData));
        navigate("/");
        document.getElementById("signupModal").close();
      } else {
        alert(data?.message);
      }
    } catch (err) {
      console.log(err?.message);
      alert(data?.message);
      document.getElementById("signupModal").close();
    }
  };

  return (
    <>
      <dialog id="signupModal" className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("signupModal").close()}>
            ✕
          </button>
          <h3 className="font-bold text-lg">Enter Your OTP</h3>
          <p className="py-4">
            Please enter the 4-digit OTP sent to your Email.
          </p>
          <input
            type="text"
            maxLength="4"
            pattern="\d{4}"
            className="input input-bordered w-full"
            placeholder="Enter 4-digit OTP"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                userOtp: e.target.value,
              }));
            }}
          />
          <div className="flex items-center justify-between mt-2 ">
            <p className="text-indigo-400">Otp will be valid for 5 minutes</p>
            <button type="button" className="btn" onClick={handleSignup}>
              Verify
            </button>
          </div>
        </div>
      </dialog>
      <div className="flex justify-center items-center w-full min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6">Create Account</h2>
            <form onSubmit={handleOtpSend}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="mt-4">
                <p className="text-sm">
                  you have an account?
                  <a href="/login" className="text-primary px-4">
                    login here
                  </a>
                </p>
              </div>
              <div className="form-control mt-4">
                <label className="cursor-pointer label">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text">
                    I agree to the Terms and Conditions
                  </span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
