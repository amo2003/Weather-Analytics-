import React from 'react';

function computeConfortIndex(weather) {
    const temp = weather.main.temp - 273.15; // Convert from Kelvin to Celsius
    const humidity = weather.main.humidity;
    const wind = weather.wind.speed;

    let score = 100 - (Math.abs(temp - 22) * 2 + humidity * 0.5 + wind * 1.5);
    score = Math.max(0, Math.min(100, score));
    return Math.round(score);

}

async function getWeatherData(){
    const cached = cache.get('weatherData');
    if(cached) return{
        cache: 'HIT',
        data: cached
    };

    const results = [];

    for(let city of cityList){
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&appid=${process.env.OPENWEATHER_API_KEY}`;

            const response = await axios.get(url);
            const weather = response.data;
            const comfortScore = computeConfortIndex(weather);

            results.push({
                city: weather.name,
                description: weather.weather[0].description,
                temp: (weather.main.temp - 273.15).toFixed(1),
                comfortScore,
            });
        }
        catch (err) {
            console.error(`Error fetching ${city.CityName} ($ {city.CityCode}):`, err.message);

            results.push({
                city: city.CityName,
                description: city.Status,
                temp: city.Temp,
                comfortScore: 0
            });
        }
    }

    //sort comfort score
    results.sort((a, b) => b.comfortScore - a.comfortScore);

    cache.set('weatherData', results);

    return{
        cache: 'MISS',
        data: results
    };

}

module.export = { getWeatherData };
