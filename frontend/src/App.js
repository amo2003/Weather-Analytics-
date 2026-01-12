import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";
import AuthButton from "./Components/AuthButton/AuthButtons";

function App() {
  const { isAuthenticated } = useAuth0(); //get authentication state (logged in or not)

  return (
    <> {/*Allows returning multiple elements without extra DOM nodes*/}

      {/*Login / Logout buttons */}
      <AuthButton />

      {/*Show dashboard only logged in */}
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
        </Routes>
      )}
    </>
  );
}

export default App;
