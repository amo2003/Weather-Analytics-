import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";
import AuthButton from "./Components/AuthButton/AuthButtons";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/*Login / Logout */}
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
