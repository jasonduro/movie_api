const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in the JWTStrategy from the Passport.js file

const jwt = require('jsonwebtoken'),
    passport = require('passport');
const { User } = require('./models');

require('./passport'); //Your local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //This is the username you're encoding in the JWT
        expiresIn: '7d', //This specifies the token will expire in 7 days
        algorithm: 'HS256' //This is the algo used to "sign" or encode the values of the JWT
    });
}

