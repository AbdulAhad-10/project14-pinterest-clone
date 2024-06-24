"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";

const LoginButton = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const showLoginForm = () => {
    setIsLoginFormVisible(true);
  };

  const hideLoginForm = () => {
    setIsLoginFormVisible(false);
  };
  return (
    <>
      <button
        className="bg-[var(--primary-color)] text-white "
        onClick={showLoginForm}
      >
        Login
      </button>

      {isLoginFormVisible && <LoginForm onClose={hideLoginForm} />}
    </>
  );
};

export default LoginButton;
