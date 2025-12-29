Project Title -
Weather Analytics Application

Project Overview -
This is a full-stack weather analytics application that fetches real-time weather data from OpenWeatherMap, computes a custom Comfort Index Score, and ranks cities based on comfort level. Authentication and authorization
are implemented using Auth0.

Tech Stack - 
FrontEnd: React
BackEnd: Node.js, Express
Authentication: Auth0 (with MFA)
Weather API: OpenWeatherMap
Caching: In-memory cache

1) Setup Instructions - 

1. Clone the repository, git clone <repo-url>
2. Backend setup
        cd backend
        npm install
        Create a .env file with:
            PORT=5000
            OPENWEATHER_API_KEY=2ee6f4edce2d0767d5aad3a2d5d70be3
            CACHE_TTL=300
        npm start
3. Frontend setup
   cd frontend
   npm install
   npm start


2) Comfort Index Formula - 

Comfort Index Score is calculated using the following parameters:

- Temperature (°C)
- Humidity (%)
- Wind Speed (m/s)

Formula:
Score = 100 - (|Temp - 22| * 2 + Humidity * 0.5 + WindSpeed * 1.5)
The score is normalized between 0 and 100.


3) Reasoning Behind Variable Weights - 

Temperature is given higher weight because human comfort is highly sensitive
to temperature variations.

Humidity affects perceived heat and discomfort, so it has moderate weight.

Wind speed can improve comfort in hot conditions, but cause discomfort
If too strong.


4) City Ranking Logic - 

Cities are sorted in descending order based on the Comfort Index Score.
The city with the highest score is ranked as "Most Comfortable".


5) Caching Design Explanation -

Weather API responses are cached on the server for 5 minutes to reduce
external API calls.
Processed comfort score results are cached separately to improve performance.
A debug endpoint is provided to check cache status (HIT or MISS).


6) Auth0 is used for authentication.

- Only authenticated users can access the dashboard
- MFA is enabled via email verification
- Public signups are disabled
- Only whitelisted users can log in

Test user:
Email: careers@fidenz.com
Password: Pass#fidenz


7) Trade-offs Considered

In-memory caching was used instead of Redis to keep the setup simple.
Comfort Index is subjective and may vary based on personal preferences.


8) Known Limitations

Weather data depends on OpenWeatherMap availability.
Comfort Index is a simplified model and not personalised per user.


9) Addtional Features

Dark Mode
The application includes a dark mode feature to improve usability and accessibility, especially in low-light environments.

- Implemented using frontend state management and CSS variables
- User can toggle between light and dark themes
- Theme selection persists during the session
- Improves user experience without impacting application performance


Sorting and Filtering
The frontend provides sorting and filtering functionality to help users analyze weather data more efficiently.

- Cities can be filtered based on conditions such as temperature or comfort index range
- Sorting allows users to order cities by temperature or comfort index
- Implemented on the frontend to reduce unnecessary backend calls
- Improves data readability and user interaction



