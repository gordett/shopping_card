var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var passport=require('passport');

var csrfProtection=csrf();
router.use(csrfProtection);

router.get('/perfil', estaLigado, function (req, res, next) {
    res.render('user/perfil');
});

router.get('/logout', estaLigado, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', estaDesligado, function (req,res,next) {
  next();
});

router.get('/login', function (req,res,next) {
    var messages=req.flash('error');
    res.render('user/login', {csrfToken: req.csrfToken(), messages:messages, ExisteErros: messages.length>0});
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/user/perfil',
    failureRedirect: '/user/login',
    failureFlash: true
}));



router.get('/registar', function (req,res,next) {
    var messages=req.flash('error');
    res.render('user/registar', {csrfToken: req.csrfToken(), messages:messages, ExisteErros: messages.length>0});
});

router.post('/registar', passport.authenticate('local.registar', {
    successRedirect: '/user/perfil',
    failureRedirect: '/user/registar',
    failureFlash: true
}));

module.exports=router;

function estaLigado(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}

function estaDesligado(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}