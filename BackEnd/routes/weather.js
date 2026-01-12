const express = require('express');  
const router = express.Router();
const { getWeatherData } = require('../services/weatherServices');
const authMiddleware  = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {  //authmiddleware runs before the controller, if token is valid proceed to controller
    try{
        const data = await getWeatherData();
        res.json(data); 
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'servr Error'});
    }
});

module.exports = router;



//The weather route is used to prevent unauthorized access to the API. Before the controller logic runs, the authentication middleware is executed to verify the user’s JWT token. Only authenticated users are allowed to access this route.