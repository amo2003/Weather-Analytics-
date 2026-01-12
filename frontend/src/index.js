import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  //allow navitage the pages without reload
import { Auth0Provider } from "@auth0/auth0-react"; //provides authentication entire app
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider  //allow authentication using auth0
    domain="amodindupa.us.auth0.com"
    clientId="SLoHzeLtsgtDPOy3tRmt2qRVZvyZFvCH"
    authorizationParams={{
      redirect_uri: window.location.origin,  //after login redirect to homepage
      audience: "https://weather-api"  //API audience to access protected backend routes
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
