"use client";
import { useState } from "react";
import SignupForm from "./SignupForm";

const Footer = () => {
  const [isSignupFormVisible, setIsSignupormVisible] = useState(false);

  const showSignupForm = () => {
    setIsSignupormVisible(true);
  };

  const hideSignupForm = () => {
    setIsSignupormVisible(false);
  };
  return (
    <footer className="py-10 bg-white">
      <div className="container mx-auto text-center">
        <p className="mb-5 text-3xl text-black">
          Sign up to save your favorite ideas and get inspired!
        </p>
        <button
          className="bg-[var(--primary-color)] text-white"
          onClick={showSignupForm}
        >
          Sign up
        </button>

        {isSignupFormVisible && <SignupForm onClose={hideSignupForm} />}
      </div>
    </footer>
  );
};

export default Footer;
