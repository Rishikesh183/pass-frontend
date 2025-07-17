import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

export const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] px-4">
      {/* Container */}
      <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Left Section - Sign In Form */}
        <div className="w-full md:w-3/5 bg-gray-100 p-6 md:p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
          <div className="w-full max-w-md">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </div>

        {/* Right Section - Create Account */}
        <div className="w-full md:w-2/5 bg-white p-8 md:p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">New Here?</h1>
          <p className="text-gray-600 mt-2 md:mt-4">Create an account to start your journey with us.</p>
          <Link to="/sign-up" className="mt-5">
            <button className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
