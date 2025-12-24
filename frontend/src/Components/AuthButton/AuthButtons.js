import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() =>
        logout({ returnTo: window.location.origin })
      }
      className="auth-btn"
    >
      Logout
    </button>
  ) : (
    <button onClick={() => loginWithRedirect()} className="auth-btn">
      Login
    </button>
  );
};

export default AuthButton;
