import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>

          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
