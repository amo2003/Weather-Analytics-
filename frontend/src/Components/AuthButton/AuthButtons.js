import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButtons.css";

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();    //get auth methods and state

  return (
    <div className="auth-container">
      {isAuthenticated ? (  //if logged in show logout button
        <button
          onClick={() =>
            logout({ returnTo: window.location.origin })
          }
          className="auth-btn logout"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => loginWithRedirect()}  //if not loging, show log button
          className="auth-btn login"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default AuthButton;
