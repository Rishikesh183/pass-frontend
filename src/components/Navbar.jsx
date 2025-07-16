import React from "react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-black text-white flex justify-between p-8 items-center h-[7vh] shadow">
      <div className="logo font-bold text-2xl">Password Manager</div>

      <div className="flex gap-4 items-center">
        {isSignedIn ? (
          <>
            <UserButton afterSignOutUrl="/sign-in" />
            <SignOutButton>
              <button className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition">
                Sign Out
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className="text-white bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
