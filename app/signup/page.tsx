"use client";

import axios from "axios";
import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setName(""); 
    setEmail("");
    setPassword("");
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        window.location.href = "/task";
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const handleSignin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        window.location.href = "/task";
      }
    } catch (error) {
      console.error("Signin failed", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <div className="px-10">
            <div className="text-3xl font-extrabold">{isSignup ? "Sign Up" : "Sign In"}</div>
          </div>
          <div className="pt-2">
            {isSignup && (
              <LabelledInput
                onChange={(e) => setName(e.target.value)}
                label="Username"
                placeholder="Your name"
              />
            )}
            <LabelledInput
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="you@example.com"
            />
            <LabelledInput
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <button
              onClick={isSignup ? handleSignup : handleSignin}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 transition-colors"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
