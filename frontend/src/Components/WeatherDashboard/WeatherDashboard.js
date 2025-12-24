import React, { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


const WeatherDashboard = () => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWeather = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently({
                audience: 'https://weather-api'
            });

            const res = await axios.get('http://localhost:5000/api/weather', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setWeatherData(res.data.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }finally {
            setLoading(false);
        }
    }, [getAccessTokenSilently]);

    useEffect(() => {
        if(!isAuthenticated) {
            loginWithRedirect();
        } else {
            fetchWeather();
        }
    }, [isAuthenticated, loginWithRedirect, fetchWeather]);

    if(loading) return <div className='loading'>Loading...</div>;
    
 
  return (
    <div className="weather-dashboard">
        <h1>Weather Dashboard</h1>

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
                {weatherData.map((city, index) => (
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
}

export default WeatherDashboard;
