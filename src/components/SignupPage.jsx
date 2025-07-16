// components/SignupPage.jsx
import { SignUp } from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div className="auth-container">
      <SignUp path="/sign-up" redirectUrl="/" />
    </div>
  );
};

export default SignupPage;
