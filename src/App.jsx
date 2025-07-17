/* eslint-disable no-unused-vars */
import { useUser } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Make sure you're using React Router
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";


function App() {
  // const { isSignedIn, isLoaded } = useUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     navigate("/sign-in"); 
  //   }
  // }, [isLoaded, isSignedIn, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Manager />} />
      </Routes>
    </>
  );
}

export default App;
