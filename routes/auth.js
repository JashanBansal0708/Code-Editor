var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/login', function(req,res,next){
    res.render('login');
  });
  
router.route('/register')
    .get(function(req,res,next) {
        res.render('register', { 
            name: '',
            email: '',
            error:''
        });
    })
    .post(function(req,res,next){
        req.checkBody('name', 'Empty Name').notEmpty();
        req.checkBody('email', 'Invalid Email').isEmail();
        req.checkBody('password','Empty password').notEmpty();
        req.checkBody('password','Password did not match').equals(req.body.confirmPassword).notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('register', {
            name: req.body.name,
            email: req.body.email,  
            error: errors
            });
        }
        else{
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function(err){
                if(err){
                    res.render('register',{errorMessages:err});
                }
                else{
                    res.redirect('/login');
                }
            })
        }
    });
module.exports = router;