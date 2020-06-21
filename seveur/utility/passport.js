const passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    // LocalStrategy = require('passport-local').Strategy,
    FortyTwoStrategy = require('passport-42').Strategy,
;

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcrypt')
// load up the user model
// var User = require('../models/User');
// var config = require('./config'); // get db config file


// =========================================================================
// 42 ======================================================================
// =========================================================================
passport.use(new FortyTwoStrategy({
    clientID: '9747f1cbc4a2e8a72f1d0d20cae899c8a9a2b023da984dcc2e1cb6b58409344e',
    clientSecret: '39011aebdadc9e1007f80c4d7dcb5a51d310039047ce9163dc164bcd697d3422',
    callbackURL: 'http://localhost:3000/api/auth/login/42/'
},
function (accessToken, refreshToken, profile, cb) {
    console.log("+++++++++++++++++++++++++++++++++++++123456789")
    // console.log(profile);    
    let newUser = {
        email: profile._json.email.replace(" ",""),
        username: profile._json.login.replace(" ",""),
        firstname: profile._json.first_name.replace(" ",""),
        lastname: profile._json.last_name.replace(" ",""),
        picture: profile._json.image_url,
        fortytwoid: profile._json.id,
        provider: '42'
    };
    // User.findOrCreate({fortytwoid: profile._json.id}, newUser, function (err, user) {
    //     const token = jwt.sign({id: user._id}, config.secret,{
    //         expiresIn: 86400 // expires in 24 hours
    //       });
    //   console.log(token);
    //   return cb(err, user, token);
  
    //   });
}
));
  passport.use(new JWTStrategy({
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        //   secretOrKey   : config.secret
      },
      function (jwtPayload, cb) {

          //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
          return UserModel.findOneById(jwtPayload.id)
              .then(user => {
                  return cb(null, user);
              })
              .catch(err => {
                  return cb(err);
              });
      }
  ));

module.exports = passport; 