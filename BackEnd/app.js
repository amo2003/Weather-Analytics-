require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');

const app = express(); //instantiate express app, handle requests

//allow request only from frontend
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//used to parse json request bodies
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.send('weather api running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




//header.payload.signature