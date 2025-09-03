import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3001/api/user/post", {name, email, password}, {withCredentials: true})
      if(res.data.success){
        // go to list route straight
        navigate('/todo-items');
      }
      else{
        setErrorMessage(res.data.message || 'Error Signing Up!')
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    finally{
      setName("");
      setEmail("");
      setPassword("");
    }

    
    } 

 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Hiii Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-6 py-2 border rounded-lg focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Address"
            className="w-full px-6 py-2 border rounded-lg focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-2 border rounded-lg focus:outline-none"
            required
          />

          <button
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-green-800"
          >
            Sign Up
          </button>

          {
            errorMessage && <p className="text-red-500 text-2xl">Error Creating the user: {errorMessage}</p>
          }
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-black font-semibold hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
