import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Create Account</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="input input-bordered"
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
              />
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
