"use client";
import { useState } from "react";
import SignupForm from "./SignupForm";

const SignupButton = () => {
  const [isSignupFormVisible, setIsSignupormVisible] = useState(false);

  const showSignupForm = () => {
    setIsSignupormVisible(true);
  };

  const hideSignupForm = () => {
    setIsSignupormVisible(false);
  };
  return (
    <>
      <button
        className="bg-[var(--secondary-color)] text-black "
        onClick={showSignupForm}
      >
        Sign up
      </button>

      {isSignupFormVisible && <SignupForm onClose={hideSignupForm} />}
    </>
  );
};

export default SignupButton;
