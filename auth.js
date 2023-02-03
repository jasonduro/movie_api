const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in the JWTStrategy from the Passport.js file

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); //Your local passport file

