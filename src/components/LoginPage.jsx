// components/LoginPage.jsx
import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <SignIn path="/sign-in" redirectUrl="/" />
    </div>
  );
};

export default LoginPage;
