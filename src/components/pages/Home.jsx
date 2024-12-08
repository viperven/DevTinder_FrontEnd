import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CookieService from "../../services/CookieService";
import { AuthService } from "../../services/AuthService";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { DataService } from "../../services/DataSerivce";

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!AuthService.isAuthenticatedUser()) {
  //     navigate("/login");
  //     return;
  //   }
  //   // initHomeData();
  //   // if (!AuthService.isAuthenticatedUser()) {
  //   //   navigate("/login");
  //   //   return;
  //   // }
  //   initHomeData();
  // }, []);

  return (
    <Layout>
      <section className="relative h-screen">
        {/* Background Image */}
        <img
          src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp"
          className="w-full h-full object-cover opacity-50"
          alt="Background"
        />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-gray-700 opacity-40"></div>

        {/* Hero Text & Call to Action */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-white px-4">
          <div className="text-white font-extrabold">
            <h1 className="text-5xl md:text-7xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
              Welcome to DevTinder
            </h1>
            <p className="text-xl mb-8 max-w-xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
              Connect with developers worldwide, collaborate on projects, and
              grow your network. Your next opportunity is just a click away only
              for Educaton purpose it's a dummy project to showcase my skills!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="btn btn-primary text-lg"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
              <button
                className="btn btn-secondary text-lg"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-800 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Chat Feature */}
            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sky-800 mb-4">Chat</h3>
              <p className="text-gray-600">
                Engage in real-time conversations with developers from around
                the world.
              </p>
            </div>

            {/* Connect Feature */}
            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                Connect
              </h3>
              <p className="text-gray-600">
                Find like-minded developers and establish lasting professional
                relationships.
              </p>
            </div>

            {/* Send Request Feature */}
            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                Send Request
              </h3>
              <p className="text-gray-600">
                Send connection requests to developers you admire or want to
                collaborate with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diff Component Section */}
      <section className="py-20">
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
              DEV TINDER
            </div>
          </div>
          <div className="diff-item-2">
            <div className="bg-base-200 grid place-content-center text-9xl font-black">
              BY RUPESH JHA
            </div>
          </div>
          <div className="diff-resizer"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-base-300 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Connecting?</h2>
        <p className="mb-8 text-lg">
          Join DevTinder today and start your journey to building meaningful
          developer relationships!
        </p>
        <div className="flex justify-center">
          <button
            className="btn btn-primary text-lg"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
