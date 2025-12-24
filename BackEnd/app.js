require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.send('weather api running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});