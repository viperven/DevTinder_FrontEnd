import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CookieService from "../../services/CookieService";
import { AuthService } from "../../services/AuthService";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { DataService } from "../../services/DataSerivce";
import { themeSelector } from "../../utils/themeSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Code,
  Zap,
  ChevronRight,
  Code2,
  Users,
  Rocket,
  Heart,
  X,
  Smartphone,
} from "lucide-react"; 



function Home() {  
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const themeSelect = useSelector((store) => store.theme.themes);
  console.log("🚀 ~ Hearder ~ themeSelect:", themeSelect)
  const dispatch = useDispatch();

  // const theme = useSelector((store)=>store.theme.theme);
  // console.log(theme);


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

  const textColorClass = themeSelect == true ? "text-zinc-900" : "text-white";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const swipe = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % developers.length);
      setDirection(0);
    }, 300);
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    });
    document.querySelectorAll(".animate-on-scroll").forEach((elem) => {
      observer.observe(elem);
    });
    return () => observer.disconnect();
  }, []);

  const developers = [
    {
      name: "Sarah Chen",
      title: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      skills: ["React", "Node.js", "TypeScript"],
      experience: "5 years",
      projects: "20+ completed",
    }
    ,
    {
      name: "Alex Rodriguez",
      title: "Frontend Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      skills: ["Vue.js", "CSS", "JavaScript"],
      experience: "3 years",
      projects: "15+ completed",
    },
    {
      name: "Maya Patel",
      title: "Backend Developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      skills: ["Python", "Django", "AWS"],
      experience: "4 years",
      projects: "12+ completed",
    },
  ];



  return (
    <Layout>

      <section className="relative h-screen">
        <img
          src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp"
          alt="Grid of profile cards showing various people"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4 ">Welcome to DevTinder</h1>
            <p className="text-xl mb-8">Discover amazing features and services</p>

            <div className="flex justify-center space-x-4">
              <button
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg p-5 rounded-lg"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
              <button
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg p-5 rounded-lg"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 ">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 ">
            How DevTinder Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
  <motion.div
    whileHover={{
      scale: 1.05,
    }}
    className="text-center animate-on-scroll bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6 transition-transform duration-300 ease-in-out"
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
      1
    </div>
    <Code2 className="w-12 h-12 mx-auto mb-4 text-rose-500" />
    <h3 className="text-xl font-bold mb-4">Create Profile</h3>
    <p className={`${textColorClass}`}>
      Build your developer profile with your skills and preferences
    </p>
  </motion.div>

  <motion.div
    whileHover={{
      scale: 1.05,
    }}
    className="text-center animate-on-scroll bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6 transition-transform duration-300 ease-in-out"
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
      2
    </div>
    <Users className="w-12 h-12 mx-auto mb-4 text-rose-500" />
    <h3 className="text-xl font-bold mb-4">Swipe & Match</h3>
    <p className={`${textColorClass}`}>
      Find your perfect code partner with our intuitive swipe interface
    </p>
  </motion.div>

  <motion.div
    whileHover={{
      scale: 1.05,
    }}
    className="text-center animate-on-scroll bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6 transition-transform duration-300 ease-in-out"
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
      3
    </div>
    <Rocket className="w-12 h-12 mx-auto mb-4 text-rose-500" />
    <h3 className="text-xl font-bold mb-4">Start Coding</h3>
    <p className={`${textColorClass}`}>
      Begin your collaboration journey together
    </p>
  </motion.div>
</div>

        </div>
      </section>

      <section className="py-20">
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-primary-content grid place-content-center text-9xl font-black"
              style={{ backgroundColor: "yellow" }}
            >
             MADE BY RUPESH JHA
            </div>
          </div>
          <div className="diff-item-2">
            <div className="bg-base-200 grid place-content-center text-9xl font-black" >
              STYLED BY KALPIT RAO RAVAN
            </div>
          </div>
          <div className="diff-resizer"></div>
        </div>
      </section>


      <section className="relative px-4 py-20 md:py-32 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-500 to-pink-500 text-transparent bg-clip-text">
              DevTinder
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${textColorClass}`}>
              Swipe Right for Your Perfect Code Partner
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{
                  x: direction * 300,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: -direction * 300,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src={developers[currentIndex].image}
                  alt={developers[currentIndex].name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-2xl font-bold ${textColorClass}`}>
                    {developers[currentIndex].name}
                  </h3>
                  <p className={`${textColorClass}`}>
                    {developers[currentIndex].title}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {developers[currentIndex].skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className={`mt-4 ${textColorClass}`}>
                    <p>Experience: {developers[currentIndex].experience}</p>
                    <p>Projects: {developers[currentIndex].projects}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => swipe(-1)}
                className="p-4 rounded-full bg-white shadow-lg"
              >
                <X className="w-8 h-8 text-rose-500" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => swipe(1)}
                className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
  <motion.div
    whileHover={{
      y: -10,
    }}
    className="p-8 rounded-xl text-center bg-white/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-shadow animate-on-scroll"
  >
    <Code className="w-12 h-12 text-white mx-auto mb-4" />
    <h3 className={`text-xl font-bold mb-4 ${textColorClass}`}>Smart Matching</h3>
    <p className={`${textColorClass}`}>
      Our AI matches you with developers based on coding style and expertise
    </p>
  </motion.div>

  <motion.div
    whileHover={{
      y: -10,
    }}
    className="p-8 text-center rounded-xl bg-white/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-shadow animate-on-scroll"
  >
    <Globe className="w-12 h-12 text-white mx-auto mb-4" />
    <h3 className={`text-xl font-bold mb-4 ${textColorClass}`}>Global Reach</h3>
    <p className={`${textColorClass}`}>
      Connect with developers worldwide instantly
    </p>
  </motion.div>

  <motion.div
    whileHover={{
      y: -10,
    }}
    className="p-8 text-center rounded-xl bg-white/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-shadow animate-on-scroll"
  >
    <Zap className="w-12 h-12 text-white mx-auto mb-4" />
    <h3 className={`text-xl font-bold mb-4 ${textColorClass}`}>Quick Connect</h3>
    <p className={`${textColorClass}`}>
      Start collaborating immediately after matching
    </p>
  </motion.div>
</div>

        </div>
      </section>

      {/* <section className="py-20 bg-base-200">
        <div className="container mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-12 ${textColorClass}`}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg moving-border-gradient">
  <h3 className={`text-2xl font-semibold mb-4 ${textColorClass}`}>Chat</h3>
  <p className={`${textColorClass}`}>
    Engage in real-time conversations with developers from around the world.
  </p>
</div>
            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg">
              <h3 className={`text-2xl font-semibold mb-4 ${textColorClass}`}>
                Connect
              </h3>
              <p className={`${textColorClass}`}>
                Find like-minded developers and establish lasting professional
                relationships.
              </p>
            </div>

            <div className="feature-card bg-base-100 p-6 rounded-lg shadow-lg">
              <h3 className={`text-2xl font-semibold mb-4 ${textColorClass}`}>
                Send Request
              </h3>
              <p className={`${textColorClass}`}>
                Send connection requests to developers you admire or want to
                collaborate with.
              </p>
            </div>

          </div>
        </div>
      </section>  */}

      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{
                x: -100,
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="animate-on-scroll"
            >
              <h3 className={`text-2xl font-bold mb-4 ${textColorClass}`}>
                Take DevTinder Everywhere
              </h3>
              <p className={`mb-6 ${textColorClass}`}>
                Download our mobile app and find code partners on the go.
                Available for iOS and Android.
              </p>
              <div className="flex gap-4">
                <Smartphone className="w-12 h-12 text-rose-500" />
                <div>
                  <p className="font-bold">Get the App</p>
                  <p className={`${textColorClass}`}>Swipe anytime, anywhere</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{
                x: 100,
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="relative"
            >
              <img
                src="https://i.postimg.cc/C5xhz0f4/model.png"
                alt="Mobile app mockup"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2
            initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            Ready to Find Your Code Match?
          </motion.h2>

          <motion.form
            initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="flex flex-col md:flex-row gap-4 justify-center mb-8"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full text-gray-900 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              type="submit"
              className="px-8 py-4 rounded-full bg-white text-rose-500 font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              Start Swiping
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.form>

          <p className="text-sm text-white text-opacity-80">
            Join DevTinder today and start your journey to building meaningful
            developer relationships!
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
