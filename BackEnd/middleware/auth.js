const { expressjwt: jwt } = require("express-jwt"); //use to validate jwt tokens
const jwksRsa = require("jwks-rsa");  //used to fetch auth0 public keys sercurely

const authMiddleware = jwt({    //protect routes by verifying jwt tokens
  secret: jwksRsa.expressJwtSecret({  //Define the jwt token verification method
    cache: true,  //cache the public keys avoid fectch everytime
    rateLimit: true,  //limit the key requests
    jwksRequestsPerMinute: 5,  //maximun 5 requests per minute
    jwksUri: "https://amodindupa.us.auth0.com/.well-known/jwks.json"  //auth0 jwks endpoint to fetch public keys
  }),
  audience: "https://weather-api",   //expected audience in the jwt token
  issuer: "https://amodindupa.us.auth0.com/",  //expected issuer of the jwt token
  algorithms: ["RS256"]  //expected algorithm used to sign the jwt token
});

module.exports = authMiddleware; 
