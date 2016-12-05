var passport=require('passport')
var User=require('../models/user')
var LocalStrategy=require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null,user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id,function (err, user) {
        done(err, user);
    });
});

passport.use('local.registar', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
},function (req, email, password, done) {
    req.checkBody('email','Email Inválido').notEmpty().isEmail();
    req.checkBody('password','Password Inválida').notEmpty().isLength({min:3});
    var errors=req.validationErrors();
    if(errors)
    {
        var messages=[];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email':email}, function (err, user) {
        if(err)
        {
            return done(err);
        }
        if(user)
        {
            return done(null, false, {message: 'Utilizador em uso'});
        }
        var newUser=new User();
        newUser.email=email;
        newUser.password=newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null, newUser)
        });
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email','Email Inválido').notEmpty().isEmail();
    req.checkBody('password','Password Inválida').notEmpty();
    var errors=req.validationErrors();
    if(errors)
    {
        var messages=[];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email':email}, function (err, user) {
        if(err)
        {
            return done(err);
        }
        if(!user)
        {
            return done(null, false, {message: 'Utilizador não encontrado'});
        }
        if(!user.validPassword(password))
        {
            return done(null, false, {message: 'Password Errada'});
        }
        return done(null, user);
    });
}));