const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://amodindupa.us.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://weather-api",
  issuer: "https://amodindupa.us.auth0.com/",
  algorithms: ["RS256"]
});

module.exports = authMiddleware; // ✅ EXPORT FUNCTION ONLY
