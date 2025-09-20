// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const {loggedIn} = useAuth();
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gray-50">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Organize Your Life With Ease ✨
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Keep track of your <span className="font-semibold">tasks </span> or {" "}
            <span className="font-semibold">to-dos</span> in one simple, powerful app. 
            Boost your productivity and never forget a task again.
          </p>
          {
            !loggedIn && <button onClick={()=>navigate('/signup')} className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg shadow hover:bg-green-700 transition">
            Get Started 🚀
          </button>
          }
          
        </div>

        {/* Replace with your own PNG */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png"
          alt="To-Do Illustration"
          className="w-72 mt-10 md:mt-0"
        />
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Our App?</h2>
        <div className="grid gap-10 md:grid-cols-2">
        

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="Tasks"
              className="w-20 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy To-Dos</h3>
            <p className="text-gray-600">
              Stay on top of your daily tasks with simple checklists.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="Sync"
              className="w-20 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Cloud Sync</h3>
            <p className="text-gray-600">
              Access your notes and tasks anywhere, anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Organized?</h2>
        <p className="text-lg mb-6">
          Join thousands of users boosting productivity with our Notes + To-Do app.
        </p>
        <button onClick={()=>navigate(`${!loggedIn ? '/login' : '/todo-items'}`)} className="cursor-pointer px-6 py-3 bg-white text-green-600 rounded-xl text-lg font-semibold shadow hover:bg-gray-100 transition">
          Start Now – It’s Free 🎉
        </button>
      </section>
    </div>
  );
};

export default Home;
