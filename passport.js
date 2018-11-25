var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy ;
var FacebookStrategy = require('passport-facebook').Strategy ; 

passport.serializeUser(function(user,done){
  done(null, user._id);
});

passport.deserializeUser(function(id,done){
    User.findOne({_id: id},function(err,user){
    done(err,user);
  });
});

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done){
        User.findOne({email: username},function(err, user){
        if(err) return done(err);
        if(!user){
          return done(null, false, {
                message: 'Incorrect username or password'
            }
          );
        }
    if(!user.validPasswrod(password)){
      return done(null, false, {
        message: 'Incorrect username or password'
      });
    }

    return done(null, user);
  })
}
passport.use(new facebookStrategy({
  clientID: '2047048018639795',
  clientSecret: 'a020b4101f94daf840e02c0bd2e089f6',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id','displayName','email']
  },
  function(token,refreshToken,profile,done){
    User.findOne({'facebookId' : profile.Id},function(err,user){
      if(user){
        return done(null,user);
      }else{
        User.findOne({email:profile.email[0].value},function(err,user){
          if(user){
            user.facebookId = profile.Id
            return user.save(function(err){
              if(err) return done(null,false,{message: "cant save user info"});
              return done(null,user);
            })
          }

          var user = new User();
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.facbookId = profile.Id;
          user.save(function(err){
            if(err) return done(null,false,{message:"cant save user info"});
            return done(null,user);
          });
        })
      }
    });
  }
));
));
