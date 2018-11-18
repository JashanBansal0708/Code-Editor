var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Platform to share the code' });
});

router.get('/about', function(req,res,next) {
  res.render('about', { title: 'Platform to share the code'})
})


router.route('/contact')
  .get(function(req,res,next) {
    res.render('contact', {
      name: '',
      email : '',
      message : '',
      error: ''        
  })
  })
  .post(function(req,res,next){
    req.checkBody('name','name should not be empty').notEmpty();
    req.checkBody('email','invalid email').isEmail();
    req.checkBody('message','message should not be empty').notEmpty();
    var errors = req.validationErrors();
    
    if(errors){
      res.render('contact', {
          name: req.body.name,
          email : req.body.email,
          message : req.body.message,
          error: errors        
      });
    }
    else{
      res.render('thank');
    }
  });

module.exports = router;
