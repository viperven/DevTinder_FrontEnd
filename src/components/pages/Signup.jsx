import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData.email);
      const data = await AuthService.register(formData);
      console.log(data);

      if (data?.isSuccess) {
        dispatch(addUser(data?.apiData));
        navigate("/");
      } else {
        alert("something went wrong try again " + data?.message);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Create Account</h2>
          <form onSubmit={handleSubmit}>
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
  );
};

export default Signup;
