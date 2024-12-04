import React, { useEffect, useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "rupesh@gmail.com",
    password: "123456",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await AuthService.loginUser(formData);
    if (data?.isSuccess) {
      dispatch(addUser(data?.apiData));
      navigate("/");
    } else {
      alert("Invalid credentials " + data?.message);
    }
  };

  useEffect(() => {
    if (AuthService.isAuthenticatedUser()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                value={formData.email}
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
                value={formData.password}
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="mt-4">
            <p className="text-sm">
              Don't have an account?
              <a href="/signup" className="text-primary">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
