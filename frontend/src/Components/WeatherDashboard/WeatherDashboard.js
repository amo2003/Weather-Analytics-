import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();  //get token without redirect, auth state, send user to login method

  //store api response
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);



  //BONUS STATES (already existing)
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('comfortScore');
  const [order, setOrder] = useState('desc');

  //DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://weather-api'
      });
//get token from auth0 to access protected backend route
//send token via authorization header
      const res = await axios.get('http://localhost:5000/api/weather', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
//store weather data in state
      setWeatherData(res.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); 
    }
  }, [getAccessTokenSilently]);

  //if not loging redirect to login, else fetch weather data
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      fetchWeather();
    }
  }, [isAuthenticated, loginWithRedirect, fetchWeather]);

  //FILTER + SORT (UNCHANGED)
  const filteredAndSortedData = useMemo(() => {
    let data = [...weatherData];

    //filter cities by name
    if (search) {
      data = data.filter(city =>
        city.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) => {
      if (order === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });

    return data;
  }, [weatherData, search, sortBy, order]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`weather-dashboard ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h1>Weather Dashboard</h1>

        {/*DARK MODE TOGGLE */}
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/*FILTER CONTROLS */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="comfortScore">Comfort Score</option>
          <option value="temp">Temperature</option>
        </select>

        <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
          {order === 'asc' ? '⬆ Asc' : '⬇ Desc'}
        </button>
      </div>

      {/* 🔹 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>City</th>
            <th>Description</th>
            <th>Temperature (°C)</th>
            <th>Comfort Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((city, index) => (
            <tr key={city.city}>
              <td>{index + 1}</td>
              <td>{city.city}</td>
              <td>{city.description}</td>
              <td>{city.temp}</td>
              <td>{city.comfortScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDashboard;



/*useState -	Store component state
useEffect -	Run code on lifecycle events
useCallback -	Prevent function recreation
useMemo	 - Optimize filtering & sorting*/