const axios = require('axios');
const NodeCache = require('node-cache');
const cityList = require('../cities.json').List;

//this is cache instance, how long data will store in chache
const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) || 300 });

// Comfort Index formula:
// 100 - (|Temp - 22| * 2 + Humidity * 0.5 + WindSpeed * 1.5)
// Score clamped between 0-100
function computeComfortIndex(weather) {
    const tempC = weather.main.temp - 273.15; // Kelvin → Celsius
    const humidity = weather.main.humidity;
    const wind = weather.wind.speed;

    let score = 100 - (Math.abs(tempC - 22) * 2 + humidity * 0.5 + wind * 1.5);
    score = Math.max(0, Math.min(100, score));
    return Math.round(score);
}

async function getWeatherData() { //main server function called by route
    // Check cache first
    const cached = cache.get('weatherData');
    if (cached) return { cache: 'HIT', data: cached };
//HIT meaa already cached data, not need call api again
    const results = [];

    for (let city of cityList) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&appid=${process.env.OPENWEATHER_API_KEY}`;
            const response = await axios.get(url);
            const weather = response.data;

            const comfortScore = computeComfortIndex(weather);
//result push to results array for frontend display
            results.push({
                city: weather.name,
                description: weather.weather[0].description,
                temp: (weather.main.temp - 273.15).toFixed(1), // Celsius
                comfortScore,
            });

        } catch (err) {
            console.error(`Error fetching ${city.CityName} (${city.CityCode}):`, err.message);
            // Push fallback data from cities.json if API fails
            results.push({
                city: city.CityName,
                description: city.Status,
                temp: city.Temp,
                comfortScore: 0 // or you can calculate a rough score based on Temp
            });
        }
    }

    // Sort by comfortScore descending
    results.sort((a, b) => b.comfortScore - a.comfortScore);

    // Cache the results
    cache.set('weatherData', results);

    return { cache: 'MISS', data: results }; //indicate fresh data and api , stored in cache
}

module.exports = { getWeatherData };
