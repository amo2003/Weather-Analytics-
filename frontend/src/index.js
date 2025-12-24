import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="amodindupa.us.auth0.com"
    clientId="SLoHzeLtsgtDPOy3tRmt2qRVZvyZFvCH"
    authorizationParams={{
      redirect_uri: window.location.oringin,
      audiance: "http://weather-api"
    }}
>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
    

);